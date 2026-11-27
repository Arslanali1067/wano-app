import test from 'node:test';
import assert from 'node:assert/strict';
import { INQUIRY_TYPES, LIMITS, isFinancial, inquiryDestination, normalizeProfile, validateInquiry, inquiryMessage } from '../src/lib/partnershipInquiry.ts';
const basic = { inquiryType: 'community', name: 'Amina', email: 'amina@example.org', message: 'A community storytelling project.' };
const financial = { ...basic, inquiryType: 'funding', profile: '@community', role: 'Project coordinator', participation: 'Original weekly stories and conversations.', communityBenefit: 'Local voices and useful event content.', acknowledgment: true };

test('all financial and nonfinancial inquiry paths have explicit routing', () => {
  for (const [type] of INQUIRY_TYPES) {
    const result = validateInquiry({ ...basic, inquiryType: type });
    assert.equal(result.ok, !isFinancial(type) && !inquiryDestination(type), type);
  }
  assert.equal(inquiryDestination('advertise'), '/advertise');
  assert.equal(inquiryDestination('support'), '/help');
  assert.equal(inquiryDestination('press'), '/press');
});
test('both financial paths enforce every financial field and real boolean acknowledgment', () => {
  for (const type of ['funding', 'paid-participation']) {
    assert.equal(validateInquiry({ ...financial, inquiryType: type }).ok, true);
    for (const field of ['profile', 'role', 'participation', 'communityBenefit', 'name', 'email', 'message']) {
      for (const value of ['', '  ', undefined, {}, [], 123]) {
        const r = validateInquiry({ ...financial, inquiryType: type, [field]: value });
        assert.equal(r.ok, false, type + '/' + field + '/' + JSON.stringify(value));
        assert.ok(r.errors[field]);
      }
    }
    for (const value of [undefined, false, 'true', 1, {}, []]) assert.equal(validateInquiry({ ...financial, inquiryType: type, acknowledgment: value }).ok, false);
  }
});
test('ordinary sponsors and strategic partners can enquire without a profile or financial answers', () => {
  for (const inquiryType of ['sponsor-wano', 'strategic', 'community', 'other']) assert.equal(validateInquiry({ ...basic, inquiryType }).ok, true);
});
test('real handle, Unicode and known old/new app-share formats are accepted and normalized', () => {
  for (const value of ['community', '@community', '@ShamiVlogUg', '@cultura.es', '@أفريقيا', '@café', '@hello_world', '@name-1', 'https://wanoafrica.com/@community', 'https://www.wanoafrica.com/@community/', 'wanoafrica.com/@community', 'https://devbe.wanoafrica.com/u/6845fdb76cd85e35c8f722f6', 'https://wanoafrica.com/u/6845fdb76cd85e35c8f722f6?utm_source=share']) assert.ok(normalizeProfile(value), value);
  assert.equal(normalizeProfile(' community '), '@community');
  assert.equal(normalizeProfile('https://wanoafrica.com/@community?utm_source=share#bio'), 'https://wanoafrica.com/@community');
});
test('unsafe, unrelated and malformed profile references fail without fetching them', () => {
  for (const value of ['javascript:alert(1)', 'file:///etc/passwd', 'https://localhost/u/1', 'https://wanoafrica.com.evil.test/@community', 'https://evil.test/@community', 'https://user:secret@wanoafrica.com/@community', 'http://wanoafrica.com/@community', 'https://wanoafrica.com:8080/@community', 'https://wanoafrica.com/advertise', 'https://wanoafrica.com/@community%0aInjected', '@two names', '@name\nnext', 'someone@example.org', 'https://wanoafrica.com/@%ZZ', '', '@', 'https://wanoafrica.com/u/not-an-id']) assert.equal(normalizeProfile(value), null, value);
});
test('malformed bodies, unknown categories, invalid email and control characters are rejected', () => {
  for (const value of [null, undefined, [], 'hello', 123, true]) assert.equal(validateInquiry(value).ok, false);
  for (const type of ['', 'fake', '<script>', {}, ['funding']]) assert.equal(validateInquiry({ ...basic, inquiryType: type }).ok, false);
  for (const email of ['invalid', 'a@', 'a@b', 'a b@example.org', 'a@example.org\r\nBcc:x@y.org']) assert.equal(validateInquiry({ ...basic, email }).ok, false);
  assert.equal(validateInquiry({ ...basic, name: 'A\nInjected' }).ok, false);
  assert.equal(validateInquiry({ ...basic, message: 'abc\u0000def' }).ok, false);
});
test('all field limits are enforced; nothing is silently truncated', () => {
  for (const [field, max] of Object.entries(LIMITS)) {
    const r = validateInquiry({ ...financial, [field]: 'x'.repeat(max + 1) });
    assert.equal(r.ok, false, field); assert.ok(r.errors[field]);
  }
  const longest = { ...financial, ...Object.fromEntries(Object.entries(LIMITS).filter(([k]) => !['email', 'profile'].includes(k)).map(([key, max]) => [key, '🌍'.repeat(Math.floor(max / 2))])), profile: 'https://wanoafrica.com/@' + 'x'.repeat(100) };
  const r = validateInquiry(longest); assert.equal(r.ok, true);
  assert.ok(inquiryMessage(r.value).length <= 3000, 'assembled message fits existing Admin schema');
});
test('all financial details survive into the Admin message and remain explicitly unverified', () => {
  const r = validateInquiry(financial); assert.equal(r.ok, true); const message = inquiryMessage(r.value);
  for (const key of ['profile', 'role', 'participation', 'communityBenefit', 'message']) assert.ok(message.includes(financial[key]));
  assert.match(message, /not verified/); assert.match(message, /acknowledged: yes/);
});
test('switching to a nonfinancial category drops hidden financial answers', () => {
  const r = validateInquiry({ ...financial, inquiryType: 'sponsor-wano' }); assert.equal(r.ok, true);
  assert.equal(r.value.role, ''); assert.equal(r.value.acknowledgment, false);
  assert.equal(inquiryMessage(r.value).includes(financial.participation), false);
});
test('200 varied multilingual proposals preserve text and consistent financial gates', () => {
  const texts = ['A story 🌍', 'Una comunidad', 'قصص المجتمع', 'Événement culturel', '</script><script>alert(1)</script>', 'Music & culture < > "'];
  for (let i = 0; i < 200; i++) {
    const input = { ...financial, inquiryType: i % 2 ? 'paid-participation' : 'funding', message: texts[i % texts.length] + '\n' + i };
    const r = validateInquiry(input); assert.equal(r.ok, true); assert.ok(inquiryMessage(r.value).includes(input.message));
    assert.equal(validateInquiry({ ...input, profile: '' }).ok, false);
  }
});
