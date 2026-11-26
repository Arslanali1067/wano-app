"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Hls from "hls.js";
import styles from "./Feed.module.css";
import { PublicVideo, videoName, creatorUrl } from "@/lib/video-seo";

export const Feed = ({ data }: { data: PublicVideo }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const source = data.remoteUrl_CF || data.urls?.hls_playlist || undefined;
  const poster = data.urls?.thumbnail || undefined;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source || data.photo) return;

    // Prefer native HLS (Safari); use MSE only when native playback is absent.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, [source, data.photo]);

  if (!data) return null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div style={{ overflow: "hidden" }}>
            <a
              // share.wanoafrica.com no longer answers (404). /v/ opens the
              // app when it's installed, otherwise the store.
              href={`/v/${data._id}`}
              className={styles.watchButton}
            >
              Watch on Wano App
            </a>
          </div>
          <h1 className={styles.title}>{videoName(data)}</h1>
          <div className={styles.playerWrapper}>
            {data.photo ? (
              // Photo posts must not be advertised to Google as playable videos.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster} alt={videoName(data)} className={styles.video} />
            ) : (
            <video
              ref={videoRef}
              src={source}
              poster={poster}
              preload="metadata"
              aria-label={videoName(data)}
              className={styles.video}
              controls
              playsInline
              autoPlay
              muted
            >
              Your browser cannot play this video. <a href={`/v/${data._id}`}>Open it in Wano</a>.
            </video>
            )}
          </div>
          <div className={styles.meta}>
            {data.user && (
              <div className={styles.creator}>
                {data.user.profile_picture && (
                  <Image
                    src={data.user.profile_picture}
                    alt={data.user.display_name || data.user.username || "Creator"}
                    width={44}
                    height={44}
                    unoptimized
                    className={styles.avatar}
                  />
                )}
                <div className={styles.creatorInfo}>
                  <span className={styles.displayName}>{data.user.display_name}</span>
                  {creatorUrl(data.user.username) && (
                    <a className={styles.handle} href={creatorUrl(data.user.username)}>@{data.user.username}</a>
                  )}
                </div>
              </div>
            )}
            {data.description && (
              <p className={styles.description}>{data.description}</p>
            )}
            <div className={styles.stats}>
              <span className={styles.stat}><strong>{data.views_count}</strong> views</span>
              <span className={styles.stat}><strong>{data.likes_count}</strong> likes</span>
              <span className={styles.stat}><strong>{data.comments_count}</strong> comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
