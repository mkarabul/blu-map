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

  it("should set a value in Redis with an expiration", async () => {
    // Arrange
    const key = "testKey";
    const value = "testValue";
    const expiration = 10;

    // Act
    const result = await cache.set(key, value, expiration);

    // Assert
    expect(result).toBeDefined();

    const result2 = await cache.get(key);
    expect(result2).toBe(value);

    setTimeout(async () => {
      const result = await cache.get(key);
      expect(result).toBeNull();
    }, expiration * 10);
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

  it("should set a value in a Redis hash with an expiration", async () => {
    // Arrange
    const key = "testKey";
    const field = "testField";
    const value = "testValue";
    const expiration = 10;

    // Act
    const result = await cache.hSet(key, field, value, expiration);

    // Assert
    expect(result).toBeDefined();

    const result2 = await cache.hGet(key, field);
    expect(result2).toBe(value);

    setTimeout(async () => {
      const result = await cache.hGet(key, field);
      expect(result).toBeNull();
    }, expiration * 10);
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

describe("hGetAll", () => {
  it("should get all values from a Redis hash", async () => {
    // Arrange
    const key = "testKey2";
    const field1 = "testField1";
    const value1 = "testValue1";
    const field2 = "testField2";
    const value2 = "testValue2";

    // Set the values in the Redis hash
    await cache.hSet(key, field1, value1);
    await cache.hSet(key, field2, value2);

    // Act
    const result = await cache.hGetAll(key);

    // Assert
    expect(result).toEqual({ [field1]: value1, [field2]: value2 });
  });

  it("should return an empty object if the hash does not exist", async () => {
    // Arrange
    const key = "nonExistentKey";

    // Act
    const result = await cache.hGetAll(key);

    // Assert
    expect(result).toEqual({});
  });
});

describe("hDel", () => {
  it("should delete a value from a Redis hash", async () => {
    // Arrange
    const key = "testKey";
    const field = "testField";
    const value = "testValue";

    // Set the value in the Redis hash
    await cache.hSet(key, field, value);

    // Act
    const result = await cache.hDel(key, field);

    // Assert
    expect(result).toBe(1);
  });
});
