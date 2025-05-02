import Logger from "../Logger";

describe("Logger", () => {
  let logger: Logger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Reset the singleton instance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Logger as any).instance = null;
    logger = Logger.getInstance();

    consoleLogSpy = jest.spyOn(console, "log").mockImplementation((...args) => {
      return args;
    });
    consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation((...args) => {
        return args;
      });
  });

  afterEach(() => {
    // Restore console methods
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe("log", () => {
    it("should log messages in non-production environment", () => {
      process.env.NODE_ENV = "development";
      logger.log("test message");
      expect(consoleLogSpy).toHaveBeenCalledWith("test message");
    });

    it("should not log messages in production environment", () => {
      process.env.NODE_ENV = "production";
      logger.log("test message");
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("should handle multiple arguments", () => {
      process.env.NODE_ENV = "development";
      logger.log("message1", "message2", { key: "value" });
      expect(consoleLogSpy).toHaveBeenCalledWith("message1", "message2", {
        key: "value",
      });
    });

    it("should handle different types of arguments", () => {
      process.env.NODE_ENV = "development";
      const testData = [
        "string",
        123,
        true,
        null,
        undefined,
        { key: "value" },
        [1, 2, 3],
      ];
      logger.log(...testData);
      expect(consoleLogSpy).toHaveBeenCalledWith(...testData);
    });
  });

  describe("error", () => {
    it("should log error messages in non-production environment", () => {
      process.env.NODE_ENV = "development";
      logger.error("error message");
      expect(consoleErrorSpy).toHaveBeenCalledWith("error message");
    });

    it("should not log error messages in production environment", () => {
      process.env.NODE_ENV = "production";
      logger.error("error message");
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("should handle multiple error arguments", () => {
      process.env.NODE_ENV = "development";
      logger.error("error1", "error2", new Error("test error"));
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "error1",
        "error2",
        new Error("test error")
      );
    });

    it("should handle different types of error arguments", () => {
      process.env.NODE_ENV = "development";
      const testData = [
        "error string",
        500,
        false,
        null,
        undefined,
        new Error("test error"),
        { error: "details" },
      ];
      logger.error(...testData);
      expect(consoleErrorSpy).toHaveBeenCalledWith(...testData);
    });
  });
});
