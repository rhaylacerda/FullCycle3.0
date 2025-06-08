import Notification from "./notification";

describe("Unit testss for notifications", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: error message,");

    const error2 = {
      message: "error message2",
      context: "customer",
    };
    notification.addError(error2);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2,"
    );

    const error3 = {
      message: "error message3",
      context: "order",
    };
    notification.addError(error3);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2,"
    );
    expect(notification.messages()).toBe(
      "customer: error message,customer: error message2,order: error message3,"
    );
  });

  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });

  it("should create errors for product", () => {
    const notification = new Notification();

    const error1 = {
      message: "invalid product name",
      context: "product",
    };
    notification.addError(error1);

    expect(notification.messages("product")).toBe("product: invalid product name,");

    const error2 = {
      message: "invalid product price",
      context: "product",
    };
    notification.addError(error2);

    expect(notification.messages("product")).toBe(
      "product: invalid product name,product: invalid product price,"
    );
  });

  it("should check if notification has errors for product", () => {
    const notification = new Notification();
    notification.addError({
      message: "price must be greater than zero",
      context: "product",
    });

    expect(notification.hasErrors()).toBe(true);
    expect(notification.messages("product")).toBe("product: price must be greater than zero,");
  });

  it("should get all product errors", () => {
    const notification = new Notification();
    const error = {
      message: "name is required",
      context: "product",
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });

});
