'use strict';
exports.__esModule = true;
exports.Calculators = exports.QuestionsPool = void 0;
var QuestionsPool = /** @class */ (function () {
  function QuestionsPool() {
    this.questions = {};
  }
  QuestionsPool.prototype.append = function (row) {
    this.questions[row.get('Uuid')] = row;
  };
  QuestionsPool.prototype.contains = function (row) {
    return row.get('Uuid') in this.questions;
  };
  return QuestionsPool;
})();
exports.QuestionsPool = QuestionsPool;
var Calculators = /** @class */ (function () {
  function Calculators() {
    this.calculators = {};
    this.questionPools = {};
  }
  Calculators.prototype.appendCalculator = function (calculator) {
    var key = calculator.get('Election key');
    if (!(key in this.calculators)) {
      this.calculators[key] = [];
    }
    this.calculators[key].push(calculator);
  };
  Calculators.prototype.shouldExtractQuestionPool = function (doc) {
    return !(doc in this.questionPools);
  };
  Calculators.prototype.setQuestionsPool = function (url, pool) {
    this.questionPools[url] = pool;
  };
  return Calculators;
})();
exports.Calculators = Calculators;
