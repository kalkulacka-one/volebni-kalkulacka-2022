const useElectionsPage = () => {
  const goBackToLandingPage = '[data-v-e4400b34]';
  const skipReadme =
    '.responsive-wrapper--medium > .container > .button--link > .medium';
  const nextStepBtn = '.next-button';
  const numberOfSteps =
    '.responsive-wrapper--medium > .container > [data-v-f1798a8d=""]';
  const btnBackToReadme =
    '.before > .responsive-wrapper--medium > .button > .medium';
  const btnSkipQuestion = '.after > .responsive-wrapper--medium > .button';
  const btnYes =
    '.responsive-wrapper--small.responsive-wrapper--large > .button--primary';

  const btnNo =
    '.responsive-wrapper--small.responsive-wrapper--large > .button--secondary';
  const numberOfQuestions =
    '.responsive-wrapper--small > .step-wrapper > .main > .card > .stack--vertical > .stack > :nth-child(1)';

  const assertGoBackBtnExist = () => {
    cy.get(goBackToLandingPage).should('exist');
  };

  const goToLandingPage = () => {
    cy.get(goBackToLandingPage).click();
  };

  const assertSkipReadmeExist = () => {
    cy.get(skipReadme).should('exist');
  };

  const clickSkipReadme = () => {
    cy.get(skipReadme).click();
  };

  const assertNumberOfReadmeHasSteps = () => {
    cy.get(numberOfSteps);
  };

  const assertNextStepBtnExist = () => {
    cy.get(nextStepBtn).should('exist');
  };

  const assertBtnBackHaveText = (readmeTextBtn: string) => {
    cy.get(btnBackToReadme).should('have.text', readmeTextBtn).should('exist');
  };

  const clickBtnBack = () => {
    cy.get(btnBackToReadme).click();
  };

  const assertBtnSkipQuestionExist = (textBtnSkipQuestion: string) => {
    cy.get(btnSkipQuestion)
      .should('have.text', textBtnSkipQuestion)
      .should('exist');
  };
  const skipBtnClick = () => {
    cy.get(btnSkipQuestion).click();
  };
  const btnYesExist = () => {
    cy.get(btnYes).should('exist');
  };
  const assertNumberOfQuestionExist = () => {
    cy.get(numberOfQuestions).should('have.length.above', 0).contains('/');
  };
  const clickBtnYes = (countOfQuestions: number) => {
    for (let i = 1; i <= countOfQuestions; i++) {
      cy.get(btnYes).each(($button) => {
        cy.wait(200);
        cy.wrap($button).click();
      });
    }
  };

  const clickBtnNo = (countOfQuestions: number) => {
    for (let i = 1; i <= countOfQuestions; i++) {
      cy.get(btnNo).each(($button) => {
        cy.wait(200);
        cy.wrap($button).click();
      });
    }
  };

  return {
    assertGoBackBtnExist,
    goToLandingPage,
    assertSkipReadmeExist,
    clickSkipReadme,
    assertNumberOfReadmeHasSteps,
    assertNextStepBtnExist,
    assertBtnBackHaveText,
    clickBtnBack,
    assertBtnSkipQuestionExist,
    skipBtnClick,
    btnYesExist,
    assertNumberOfQuestionExist,
    clickBtnYes,
    clickBtnNo,
  };
};
export default useElectionsPage;
