import puppeteer from "puppeteer";
import fs from "fs";
import "dotenv/config";

const url = "https://example.com";
const workDir = process.env.WORK_DIR || "/tmp/";

console.log("Starting evaluations...");

const pageVisit = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const title = await page.title();
  const html = await page.content();
  console.log("Address: ", url);
  console.log("Title: ", title);

  fs.writeFileSync(`${workDir}target.html`, html);

  await browser.close();
};

try {
  fs.mkdirSync(workDir, { recursive: true });
  pageVisit();
} catch (e) {
  console.log("Error in Lambda Handler:", e);
}
