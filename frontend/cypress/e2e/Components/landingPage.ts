const useLandingPage = () => {
  const launchVoteBtn = '.button--filled';

  const assertBtnForVoteExist = () => {
    cy.get(launchVoteBtn).should('exist');
  };
  const launchNewVote = () => {
    cy.get(launchVoteBtn).click();
  };
  return { assertBtnForVoteExist, launchNewVote };
};
export default useLandingPage;
