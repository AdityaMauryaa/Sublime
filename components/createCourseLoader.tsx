"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CourseLoader = ({
  statusMessage,
  courseId,
}: {
  statusMessage: string;
  courseId?: string;
}) => {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  // Effect 1: Disable scroll on mount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Effect 2: Countdown timer
  useEffect(() => {
    if (!courseId) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(interval);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [courseId]);

  // Effect 3: Redirect after 5 seconds
  useEffect(() => {
    if (!courseId) return;

    const timeout = setTimeout(() => {
      router.push(`/courses/${courseId}`);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [courseId, router]);

  return (
    <motion.section
      className="fixed h-screen w-full z-50 backdrop-blur-3xl flex justify-center items-center flex-col gap-5 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeOut",
        duration: 0.3,
      }}
    >
      <h1 className="text-xl">{statusMessage}</h1>

      {courseId && (
        <>
          <p className="text-sm text-gray-400">
            Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
          </p>
          <Link
            href={`/courses/${courseId}`}
            className="px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition"
          >
            Explore Now
          </Link>
        </>
      )}
    </motion.section>
  );
};

export default CourseLoader;
