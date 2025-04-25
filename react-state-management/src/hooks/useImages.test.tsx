import { renderHook, act } from "@testing-library/react";
import { useImages } from "./useImages";

describe("useImages hook", () => {
  it("should initialize with empty array by default", () => {
    const { result } = renderHook(() => useImages());
    expect(result.current.images).toEqual([]);
  });

  it("should initialize with provided initial value", () => {
    const initialImages = [
      {
        id: "1",
        title: "Test Image 1",
        imageUrl: "test1.jpg",
        width: "100",
        height: "100",
      },
    ];

    const { result } = renderHook(() => useImages(initialImages));
    expect(result.current.images).toEqual(initialImages);
  });

  it("should update images when saveImages is called", () => {
    const { result } = renderHook(() => useImages());

    const newImages = [
      {
        id: "3",
        title: "New Image",
        imageUrl: "new.jpg",
        width: "300",
        height: "300",
      },
    ];

    act(() => {
      result.current.saveImages(newImages);
    });

    expect(result.current.images).toEqual(newImages);
  });

  it("should return the saved images from saveImages function", () => {
    const { result } = renderHook(() => useImages());

    const newImages = [
      {
        id: "4",
        title: "Another Image",
        imageUrl: "another.jpg",
        width: "400",
        height: "400",
      },
    ];

    let returnValue;
    act(() => {
      returnValue = result.current.saveImages(newImages);
    });

    expect(returnValue).toEqual(newImages);
  });

  it("should replace previous images when saveImages is called", () => {
    const initialImages = [
      {
        id: "5",
        title: "Initial Image",
        imageUrl: "initial.jpg",
        width: "500",
        height: "500",
      },
    ];

    const { result } = renderHook(() => useImages(initialImages));

    const newImages = [
      {
        id: "6",
        title: "Replacement Image",
        imageUrl: "replacement.jpg",
        width: "600",
        height: "600",
      },
    ];

    act(() => {
      result.current.saveImages(newImages);
    });

    expect(result.current.images).toEqual(newImages);
    expect(result.current.images).not.toEqual(initialImages);
  });
});
