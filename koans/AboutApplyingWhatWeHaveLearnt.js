var _; //globals

describe("About Applying What We Have Learnt", function () {

  var products;

  beforeEach(function () {
    products = [
      { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
      { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
      { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
      { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
      { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i, j, hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i++) {
      if (!products[i].containsNuts) {
        hasMushrooms = false;
        for (j = 0; j < products[i].ingredients.length; j++) {
          if (products[i].ingredients[j] === "mushrooms") {
            hasMushrooms = true;
          }
        }
        if (!hasMushrooms) productsICanEat.push(products[i]);
      }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
    var productsICanEat = _(products).filter(function(p) {
      return !p.containsNuts && !_(p.ingredients).contains("mushrooms");
    });

    expect(productsICanEat.length).toBe(1);
    expect(productsICanEat[0].name).toBe("Pizza Primavera");
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;
    for (var i = 1; i < 1000; i++) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _(_.range(1000)).chain()
      .select(function(x) { return x % 3 == 0 || x % 5 == 0 })
      .reduce(function(sum, x) { return sum + x; })
      .value();

    expect(sum).toBe(233168);
  });

  it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i++) {
      for (j = 0; j < products[i].ingredients.length; j++) {
        ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
      }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = _(products).chain()
      .map(function(p) { return p.ingredients })
      .flatten()
      .reduce(function(counts, ingredient) {
        counts[ingredient] = (counts[ingredient] || 0) + 1;
        return counts;
      }, {})
      .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should find the largest prime factor of a composite number", function () {
    var n = 1234;
    var smallest_factor = _(_.range(2, n - 1)).find(function (x) { return (n % x) === 0 });
    var largest_factor = n / smallest_factor;

    expect(largest_factor).toBe(617);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function isPalindrome(num) {
        var str = num.toString();
        return str.split('').reverse().join('') === str;
    }

    function palindromes() {
        var max = 999 * 999;
        var min = 100 * 100;
        return _.select(_.range(max, min, -1), isPalindrome);
    }

    var result = palindromes().find(function (x) {
        if (_.find(_.range(999, 100, -1), function (y) {
            return (x % y === 0 && y != x / y && x / y < 1000) ? true : false;
        })) return true;
    });

    expect(result).toBe(906609);
  });

  // it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

  // });

  // it("should find the difference between the sum of the squares and the square of the sums", function () {

  // });

  // it("should find the 10001st prime", function () {

  // });
});
