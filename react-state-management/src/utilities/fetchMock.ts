export const fetchMock = jest.fn();

fetchMock.mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
  })
);

window.fetch = fetchMock;

export const successfulResponse = {
  data: [
    {
      type: "gif",
      id: "uADTQTTlpQWeydiHfs1",
      url: "https://giphy.com/gifs/my-image",
      title: "Image 1",
      images: {
        downsized_large: {
          height: "480",
          width: "480",
          size: "9337371",
          url: "https://media4.giphy.com/media/my-gif.gif",
        },
      },
    },
    {
      type: "gif",
      id: "uADTQTTlpQWeydiHfs2",
      url: "https://giphy.com/gifs/my-image",
      title: "Image 2",
      images: {
        downsized_large: {
          height: "480",
          width: "480",
          size: "9337371",
          url: "https://media4.giphy.com/media/my-gif.gif",
        },
      },
    },
    {
      type: "gif",
      id: "uADTQTTlpQWeydiHfs3",
      url: "https://giphy.com/gifs/my-image",
      title: "Image 3",
      images: {
        downsized_large: {
          height: "480",
          width: "480",
          size: "9337371",
          url: "https://media4.giphy.com/media/my-gif.gif",
        },
      },
    },
  ],
};
