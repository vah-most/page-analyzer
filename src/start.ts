import puppeteer from "puppeteer";

const url = "https://example.com";

console.log("Starting evaluations...");

const pageVisit = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({ width: 1080, height: 1024 });

  const title = await page.title();
  console.log("Address: ", url);
  console.log("Title: ", title);

  await browser.close();
};

try {
  pageVisit();
} catch (e) {
  console.log("Error in Lambda Handler:", e);
}
