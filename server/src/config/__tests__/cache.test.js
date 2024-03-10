const cache = require("../cache");

describe("set", () => {
  it("should set a value in Redis", async () => {
    // Arrange
    const key = "testKey";
    const value = "testValue";

    // Act
    const result = await cache.set(key, value);

    // Assert
    expect(result).toBeDefined();
    // Add more assertions if needed
  });
});

describe("get", () => {
  it("should get a value from Redis", async () => {
    // Arrange
    const key = "testKey";
    const value = "testValue";

    // Set the value in Redis
    await cache.set(key, value);

    // Act
    const result = await cache.get(key);

    // Assert
    expect(result).toBe(value);
    // Add more assertions if needed
  });

  it("should return null if the value does not exist in Redis", async () => {
    // Arrange
    const key = "nonExistentKey";

    // Act
    const result = await cache.get(key);

    // Assert
    expect(result).toBeNull();
  });
});

describe("del", () => {
  it("should delete a value from Redis", async () => {
    // Arrange
    const key = "testKey";
    const value = "testValue";

    // Set the value in Redis
    await cache.set(key, value);

    // Act
    const result = await cache.del(key);

    // Assert
    expect(result).toBe(1);
  });
});
