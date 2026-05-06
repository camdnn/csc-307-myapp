// module.test.js
import mut from "./module.js"; // MUT = Module Under Test

test("Testing sum -- success", () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test("Testing div -- success", () => {
  const expected = 3;
  const got = mut.div(12, 4);
  expect(got).toBe(expected);
});

test("Testing div -- success", () => {
  const expected = 0;
  const got = mut.div(0, 20);
  expect(got).toBe(expected);
});
test("Testing div -- success", () => {
  const expected = Infinity;
  const got = mut.div(10, 0);
  expect(got).toBe(expected);
});
test("Testing div -- success", () => {
  const expected = -Infinity;
  const got = mut.div(-12, 0);
  expect(got).toBe(expected);
});

test("Testing containsNumbers -- success", () => {
  const expected = false;
  const got = mut.containsNumbers("Hello");
  expect(got).toBe(expected);
});

test("Testing containsNumbers -- success", () => {
  const expected = false;
  const got = mut.containsNumbers(" ");
  expect(got).toBe(expected);
});

test("Testing containsNumbers -- success", () => {
  const expected = true;
  const got = mut.containsNumbers("11bello");
  expect(got).toBe(expected);
});

test("Testing containsNumbers -- success", () => {
  const expected = true;
  const got = mut.containsNumbers("124834");
  expect(got).toBe(expected);
});




