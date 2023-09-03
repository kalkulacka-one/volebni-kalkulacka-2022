import useLandingPage from '../Components/landingPage';
import useSummaryPage from '../Components/summaryPage';
import useElectionsPage from '../Components/electionsPage';

const landingPage = useLandingPage();
const electionsPage = useElectionsPage();
const sumPage = useSummaryPage();
const expectedText = {
  infoPageBackToReadme: 'NávodNávod',
  infoPageSkipQuestion: 'PřeskočitPřeskočit otázkuPřeskočit otázku',
  voteTextBtn: 'PředchozíPředchozí otázka',
  resumePage: 'Zobrazit',
};
before(() => {
  cy.clearAllLocalStorage();
  cy.visit('/');
});
describe('Happy day flow with - Yes answer', () => {
  it('should show correct landingPage', () => {
    landingPage.assertBtnForVoteExist();
    landingPage.launchNewVote();
  });
  it('should open elections page', () => {
    electionsPage.assertSkipReadmeExist();

    electionsPage.assertNextStepBtnExist();
    electionsPage.clickSkipReadme();
    electionsPage.assertBtnBackHaveText(expectedText.infoPageBackToReadme);
    electionsPage.assertBtnSkipQuestionExist(expectedText.infoPageSkipQuestion);
    //TODO: goToNextStep();
    electionsPage.skipBtnClick();
    electionsPage.assertBtnBackHaveText(expectedText.voteTextBtn);
    electionsPage.assertNumberOfQuestionExist();
    electionsPage.clickBtnBack();

    electionsPage.assertBtnBackHaveText(expectedText.infoPageBackToReadme);
    electionsPage.btnYesExist();
    electionsPage.clickBtnYes(20); // insert here number of questions
  });
  it('should show summary', () => {
    sumPage.assertUrlRecapExist('rekapitulace');
    sumPage.assertBtnRecapExist();
    sumPage.assertShowResultContainsText(expectedText.resumePage);
    // sumPage.clickBtnRecap(); not working now
  });
});
