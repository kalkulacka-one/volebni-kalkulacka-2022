const useLandingPage = () => {
  const launchVoteBtn = '.stack--spacing-medium > .button';

  const assertBtnForVoteExist = () => {
    cy.get(launchVoteBtn).should('exist');
  };
  const launchNewVote = () => {
    cy.get(launchVoteBtn).click();
  };
  return { assertBtnForVoteExist, launchNewVote };
};
export default useLandingPage;
