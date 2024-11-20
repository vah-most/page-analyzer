import puppeteer, { Page } from "puppeteer";
import fs from "fs";
import crypto from "crypto";

import "dotenv/config";

const url = process.env.TARGET_URL || "https://example.com";
const workDir = process.env.WORK_DIR || "/tmp/";

console.log("Starting evaluations...");

async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  });
}

const pageVisit = async () => {
  console.time("page-visit:");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await autoScroll(page);

  const title = await page.title();
  const html = await page.content();
  var hashedUrl = crypto.createHash("md5").update(url).digest("hex");
  const targetPath = `${workDir}${hashedUrl}.html`;
  fs.writeFileSync(targetPath, html);

  console.log("Address: ", url);
  console.log("Title: ", title);
  console.log("Target-Path", targetPath);

  await browser.close();
  console.timeEnd("page-visit:");
};

try {
  fs.mkdirSync(workDir, { recursive: true });
  pageVisit();
} catch (e) {
  console.log("Error in Lambda Handler:", e);
}
