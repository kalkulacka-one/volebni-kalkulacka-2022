const useSummaryPage = () => {
  const btnRecap = '.after > .button';
  const showResult = '.after > .button > .medium';
  const btnAnswerYes = (indexOfQuestion: number) =>
    ':nth-child(' +
    indexOfQuestion +
    ') > .answer > .responsive-wrapper--small > .button--primary';
  const btnShowResults = '.after > .button > .medium';
  const btnAnswerNo = (indexOfQuestion: number) =>
    ':nth-child(' +
    indexOfQuestion +
    ') > .answer > .responsive-wrapper--small > .button--primary';

  const assertUrlRecapExist = (urlRecap: string) => {
    cy.url().should('include', urlRecap);
  };

  const assertBtnRecapExist = () => {
    cy.get(btnRecap).should('exist');
  };

  const clickBtnRecap = () => {
    cy.get(btnRecap).click();
  };

  const assertShowResultContainsText = (textResult: string) => {
    cy.get(showResult).contains(textResult);
  };

  const assertAllAnswersAreYes = (numberOfQuestions: number) => {
    for (let i = 1; i <= numberOfQuestions; i++) {
      cy.get(btnAnswerYes(i)).should('exist');
    }
  };

  const assertAllAnswersAreNo = (numberOfQuestions: number) => {
    for (let i = 1; i <= numberOfQuestions; i++) {
      cy.get(btnAnswerNo(i)).should('exist');
    }
  };

  const clickShowResults = () => {
    cy.get(btnShowResults).click();
  };

  return {
    assertBtnRecapExist,
    clickBtnRecap,
    assertUrlRecapExist,
    assertShowResultContainsText,
    assertAllAnswersAreYes,
    clickShowResults,
    assertAllAnswersAreNo,
  };
};
export default useSummaryPage;
