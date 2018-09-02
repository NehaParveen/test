const shorten = require("../src/shorten");

let shortenAndLog = url => {
  const shortcode = shorten(url);
  console.log('shorten("' + url + '") => ' + shortcode);
  return shortcode;
};

const shortcodePattern = /^[0-9a-zA-Z]{6}$/;

test("shortening a URL should return a correct-looking shortcode", () => {
  /**
   *  We'll check if the return from the function is a
   * string that contains the expected characters, and is
   * of the correct length.
   */
  const shortcode = shortenAndLog("https://www.hackkar.com");
  expect(shortcode).toMatch(shortcodePattern);
});

test("different URLs should yield different shortcodes", () => {
  const firstShortcode = shortenAndLog("https://www.google.com");
  const secondShortcode = shortenAndLog("https://www.reddit.com");

  expect(firstShortcode).toMatch(shortcodePattern);
  expect(secondShortcode).toMatch(shortcodePattern);

  /**
   * The function should generate different shortcodes for
   * different URLs.
   */
  expect(firstShortcode).not.toEqual(secondShortcode);
});

test("shortening a URL twice should return same shortcode", () => {
  const firstShortcode = shortenAndLog("https://news.ycombinator.com");
  const secondShortcode = shortenAndLog("https://news.ycombinator.com");

  expect(firstShortcode).toMatch(shortcodePattern);

  /**
   * Repeated calls of the URL should yield the same
   * shortcode. This allows reuse of the code if a
   * previously shortened URL is requested again.
   */
  expect(firstShortcode).toEqual(secondShortcode);
});
