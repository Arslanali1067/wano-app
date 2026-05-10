"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Hls from "hls.js";
import styles from "./Feed.module.css";

interface User {
  username: string;
  display_name: string;
  profile_picture: string;
}

interface VideoData {
  _id: string;
  title: string | null;
  description: string;
  views_count: number;
  likes_count: number;
  comments_count: number;
  remoteUrl_CF: string;
  is_liked: boolean;
  is_following: boolean;
  user: User;
}

export const Feed = ({ data: _data }: { data: unknown }) => {
  const data = _data as VideoData;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !data?.remoteUrl_CF) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(data.remoteUrl_CF);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = data.remoteUrl_CF;
    }
  }, [data?.remoteUrl_CF]);

  if (!data) return null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div style={{ overflow: "hidden" }}>
            <a
              href={`https://share.wanoafrica.com/pages/feed?videoId=${data._id}&single=true`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.watchButton}
            >
              Watch on Wano App
            </a>
          </div>
          <div className={styles.playerWrapper}>
            <video
              ref={videoRef}
              className={styles.video}
              controls
              playsInline
              autoPlay
              muted
            />
          </div>
          <div className={styles.meta}>
            {data.user && (
              <div className={styles.creator}>
                {data.user.profile_picture && (
                  <Image
                    src={data.user.profile_picture}
                    alt={data.user.display_name}
                    width={44}
                    height={44}
                    className={styles.avatar}
                  />
                )}
                <div className={styles.creatorInfo}>
                  <span className={styles.displayName}>{data.user.display_name}</span>
                  <span className={styles.handle}>@{data.user.username}</span>
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
