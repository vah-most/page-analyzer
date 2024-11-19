var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import puppeteer from "puppeteer";
console.log("Starting evaluations...");
const pageVisit = () => __awaiter(void 0, void 0, void 0, function* () {
    // Launch the browser and open a new blank page
    const browser = yield puppeteer.launch();
    const page = yield browser.newPage();
});
try {
    pageVisit();
}
catch (e) {
    console.log("Error in Lambda Handler:", e);
}
