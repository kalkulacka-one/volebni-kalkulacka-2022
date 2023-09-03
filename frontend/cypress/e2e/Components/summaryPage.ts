const useSummaryPage = () => {
  const btnRecap = '.after > .button';
  const showResult = '.after > .button > .medium';
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
  return {
    assertBtnRecapExist,
    clickBtnRecap,
    assertUrlRecapExist,
    assertShowResultContainsText,
  };
};
export default useSummaryPage;
