import useLandingPage from '../components/landingPage';
import useSummaryPage from '../components/summaryPage';
import useElectionsPage from '../components/electionsPage';

const landingPage = useLandingPage();
const electionsPage = useElectionsPage();
const sumPage = useSummaryPage();
const expectedText = {
  infoPageBackToReadme: 'NávodNávod',
  infoPageSkipQuestion: 'PreskočiťPreskočiť otázkuPreskočiť otázku',
  voteTextBtn: 'PredchádzajúcaPredchádzajúca otázka',
  resumePage: 'Zobraziť',
};
before(() => {
  cy.clearAllLocalStorage();
  cy.visit('');
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

    electionsPage.skipBtnClick();

    electionsPage.assertBtnBackHaveText(expectedText.voteTextBtn);
    electionsPage.assertNumberOfQuestionExist();
    electionsPage.clickBtnBack();

    electionsPage.btnYesExist();
    electionsPage.clickBtnYes(30); // insert here number of questions
  });
  it('should show summary', () => {
    sumPage.assertUrlRecapExist('rekapitulacia');
    sumPage.assertBtnRecapExist();
    sumPage.assertAllAnswersAreYes(30);
    sumPage.clickShowResults();
  });
});

describe('Happy day flow with - No answer', () => {
  before(() => {
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
    cy.clearAllSessionStorage();
    cy.visit('');
  });
  it('should show correct landingPage', () => {
    landingPage.assertBtnForVoteExist();
    landingPage.launchNewVote();
  });
  it('should open elections page', () => {
    electionsPage.assertSkipReadmeExist();

    electionsPage.assertNextStepBtnExist();
    electionsPage.clickSkipReadme();

    electionsPage.assertNumberOfQuestionExist();
    electionsPage.btnYesExist();
    electionsPage.clickBtnNo(30); // insert here number of questions
  });
  it('should show summary', () => {
    sumPage.assertUrlRecapExist('rekapitulacia');
    sumPage.assertBtnRecapExist();
    sumPage.assertAllAnswersAreNo(30);
    sumPage.clickShowResults();
  });
});
