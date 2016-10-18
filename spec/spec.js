var exponent = require('../js/script.js');

describe("exponent", function() {
  it("checks result of call function exponent with both positive arguments", function() {
  	var result;  	
    result = exponent(2, 3);
    expect(result).toBe(8);
  });
  it("checks result of call function exponent with negative first argument", function() {
  	var result;
  	result = exponent(-2, 3);
  	expect(result).toBe(-8);
  });
  it("checks result of call function exponent with negative second argument", function() {
  	var result;
  	result = exponent(2, -3);
  	expect(result).toBe(0.125);
  });
  it("checks result of call function exponent with both negative arguments", function() {
  	var result;  	
    result = exponent(-2, -3);
    expect(result).toBe(-0.125);
  });
});