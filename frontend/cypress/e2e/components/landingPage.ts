const useLandingPage = () => {
  const launchVoteBtn =
    '#app > div > div > div > main > div.prezident-hero > div.other-calcs > div.card.card--corner-top-left.card--border.card--border-normal.card--shadow.other-calc-card.calc-youth > div > a';

  const assertBtnForVoteExist = () => {
    cy.get(launchVoteBtn).should('exist');
  };
  const launchNewVote = () => {
    cy.get(launchVoteBtn).click();
  };
  return { assertBtnForVoteExist, launchNewVote };
};
export default useLandingPage;
