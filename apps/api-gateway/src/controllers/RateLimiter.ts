import { RATE_LIMIT } from "../config/constants";
import { RateLimitStore } from "../types/RateLimitStore";

class RateLimiter {
  private static instance: RateLimiter;
  private store: RateLimitStore = {};
  private readonly windowMs: number;
  private readonly maxRequests: number;

  private constructor() {
    this.windowMs = RATE_LIMIT.WINDOW_MS;
    this.maxRequests = RATE_LIMIT.MAX_REQUESTS;
  }

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  private cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach((key) => {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
      }
    });
  }

  public check(key: string): { allowed: boolean; remaining: number } {
    this.cleanup();
    const now = Date.now();

    if (!this.store[key] || this.store[key].resetTime < now) {
      this.store[key] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return { allowed: true, remaining: this.maxRequests - 1 };
    }

    if (this.store[key].count >= this.maxRequests) {
      return { allowed: false, remaining: 0 };
    }

    this.store[key].count++;
    return {
      allowed: true,
      remaining: this.maxRequests - this.store[key].count,
    };
  }
}

export default RateLimiter;
