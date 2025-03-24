export const fetchMock = jest.fn();

fetchMock.mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
  })
);

window.fetch = fetchMock;
