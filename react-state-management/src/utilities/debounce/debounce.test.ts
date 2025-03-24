import { debounce } from "./debounce";

describe("Debounce Utility", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should call the function after the specified delay", async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn("test");
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    await Promise.resolve();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("test");
  });

  it("should only call the function once if called multiple times within the delay", async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn("test1");
    debouncedFn("test2");
    debouncedFn("test3");
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    await Promise.resolve();

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("test3");
  });

  it("should call the function immediately if immediate is true", async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500, true);

    await debouncedFn("test");
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("test");

    jest.advanceTimersByTime(500);
    await Promise.resolve();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should wait for specified delay before allowing another call", async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn("test1");
    jest.advanceTimersByTime(500);
    await Promise.resolve();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("test1");

    mockFn.mockClear();

    debouncedFn("test2");
    jest.advanceTimersByTime(500);
    await Promise.resolve();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("test2");
  });

  it("should properly handle async functions", async () => {
    const mockAsyncFn = jest.fn().mockImplementation(async (value) => {
      return `processed-${value}`;
    });

    const debouncedFn = debounce(mockAsyncFn, 500);
    const promise = debouncedFn("test");
    expect(mockAsyncFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    await promise;
    expect(mockAsyncFn).toHaveBeenCalledTimes(1);
    expect(mockAsyncFn).toHaveBeenCalledWith("test");
  });

  it("should handle rejections in async functions", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const mockAsyncFn = jest.fn().mockImplementation(async () => {
      throw new Error("Test error");
    });

    const debouncedFn = debounce(mockAsyncFn, 500);
    const promise = debouncedFn("test");

    jest.advanceTimersByTime(500);

    await promise.catch(() => {});
    await jest.runAllTimers();
    await Promise.resolve();

    expect(mockAsyncFn).toHaveBeenCalledTimes(1);
    expect(mockAsyncFn).toHaveBeenCalledWith("test");
    expect(console.error).toHaveBeenCalled();
    (console.error as jest.Mock).mockRestore();
  });

  it("should cancel pending calls when function is called again", async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn("test1");

    jest.advanceTimersByTime(250);

    debouncedFn("test2");

    jest.advanceTimersByTime(250);
    await Promise.resolve();
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(250);
    await Promise.resolve();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("test2");
  });
});
