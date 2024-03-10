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

describe("hSet", () => {
  it("should set a value in a Redis hash", async () => {
    // Arrange
    const key = "testKey";
    const field = "testField";
    const value = "testValue";

    // Act
    const result = await cache.hSet(key, field, value);

    // Assert
    expect(result).toBeDefined();
  });
});

describe("hGet", () => {
  it("should get a value from a Redis hash", async () => {
    // Arrange
    const key = "testKey";
    const field = "testField";
    const value = "testValue";

    // Set the value in the Redis hash
    await cache.hSet(key, field, value);

    // Act
    const result = await cache.hGet(key, field);

    // Assert
    expect(result).toBe(value);
  });

  it("should return null if the value does not exist in the Redis hash", async () => {
    // Arrange
    const key = "nonExistentKey";
    const field = "nonExistentField";

    // Act
    const result = await cache.hGet(key, field);

    // Assert
    expect(result).toBeNull();
  });
});
