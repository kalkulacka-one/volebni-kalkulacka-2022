'use strict';
exports.__esModule = true;
exports.Calculators = void 0;
var QuestionsPool = /** @class */ (function () {
  function QuestionsPool() {
    this.questions = {};
  }
  return QuestionsPool;
})();
var Calculators = /** @class */ (function () {
  function Calculators() {
    this.calculators = {};
    this.questionPools = {};
  }
  return Calculators;
})();
exports.Calculators = Calculators;
