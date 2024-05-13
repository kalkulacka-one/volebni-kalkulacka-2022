<script setup lang="ts">
import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import DonateBlock from '@/components/DonateBlock.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';
import LogoComponent from '@/components/design-system/style/LogoComponent.vue';
</script>

<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
        <ContainerComponent
          class="navigation-bar"
          padding="medium"
          responsive-padding
          background="transparent"
        >
          <div class="grid">
            <router-link to="/"
              ><LogoComponent responsive />
              <div class="title">
                <BodyText size="small"> </BodyText></div
            ></router-link>
            <StackComponent class="right" horizontal spacing="small">
            </StackComponent>
          </div>
        </ContainerComponent>
      </template>
    </StickyHeaderLayout>
    <StaticContentLayout>
      <StackComponent spacing="large" class="section">
        <HeadlineText tag="h1" size="large">Über den Wahlrechner</HeadlineText>
        <BodyText size="large">
          Die Orientierungshilfe für Wähler:innen in Österreich
        </BodyText>
        <TitleText size="large" tag="h2">Mission</TitleText>
        <BodyText size="large">
          Österreichs Demokratie braucht eine überparteiliche, ausgewogene,
          barrierefreie und wissenschaftlich fundierte Unterstützung für
          Wähler:innen. Insbesondere Erstwähler:innen benötigen
          Orientierungshilfen.
        </BodyText>
        <BodyText size="large">
          Für dieses Ziel haben sich folgende Organisationen aus
          Zivilgesellschaft und Wissenschaft zusammengefunden, um eine neue
          Orientierungshilfe für die Wähler:innen in Österreich (Voting Advice
          Application, VAA) zu entwickeln:
        </BodyText>
        <BodyText size="large">
          <ul>
            <li>Gründungsverein Österreichische Demokratiestiftung</li>
            <li>KohoVolit.eu</li>
            <li>wahbeobachtung.org</li>
            <li>PolEdu - Politics & Education</li>
            <li>Bizeps</li>
            <li>Vokskabin.hu/Andrássy Universität Budapest</li>
          </ul>
        </BodyText>
        <TitleText size="large" tag="h2"
          >Wie funktioniert wahlrechner.at?
        </TitleText>
        <BodyText size="large">
          Wahlrechner ist ein interaktives Online-Tool mit dem Ziel, die
          Nutzer:innen über die wichtigsten (gesellschafts-)politischen Fragen
          der aktuellen Wahlperiode zu informieren und ihnen eine
          Orientierungshilfe über die Positionen der Parteien anzubieten. </BodyText
        ><BodyText size="large">
          Der Wahlrechner stellt den Nutzer:innen rund 40 Fragen, die mit Dafür
          oder Dagegen beantwortet werden können. Zusätzlich kann Weiß
          nicht/Weiter ausgewählt werden. Die Angaben der Nutzer:innen werden
          mit den Angaben der Parteien verglichen und die Nutzer:innen bekommen
          ein Ergebnis, wie ihre Angaben mit jenen der Parteien übereinstimmen. </BodyText
        ><BodyText size="large">
          Der österreichische Wahlrechner kooperiert auf europäischer Ebene mit
          VoteMatch.eu, so können die Nutzer:innen ihre Antworten mit denen von
          Parteien aus anderen EU- Ländern vergleichen. </BodyText
        ><BodyText size="large">
          15 Fragen aus dem europäischen Katalog übernehmen alle
          Wahlorientierungshilfen, die an VoteMatch.eu teilnehmen. 25 weitere
          Fragen werden nach nationalen Themenlagen erarbeitet. So ergibt sich
          ein Fragenkatalog von 40 Fragen.
        </BodyText>
        <TitleText size="large" tag="h2"
          >Wer soll angesprochen werden?
        </TitleText>
        <BodyText size="large">
          Zielgruppe ist eine möglichst breite Öffentlichkeit, die sich vor der
          Europawahl informieren will. Wie die Zahlen aus anderen Ländern
          zeigen, werden Online-Wahlhilfen von Jahr zu Jahr beliebter. Die
          Online-Wahlhilfe des Projektpartners KohoVolit.eu aus Tschechien
          erreichte bei den Präsidentschaftswahlen 2023 40 Prozent der
          Wähler:innen. In Deutschland wurde der Wahl-O-Mat im Vorfeld der
          letzten Bundestagswahl 2021 21,3 Millionen Mal aufgerufen.
        </BodyText>
        <TitleText size="large" tag="h2">
          Wie gewährleistet wahlrechner.at seine politische Unabhängigkeit und
          Ausgewogenheit?
        </TitleText>
        <BodyText size="large">
          Das Programm speichert keine persönlichen Daten, so dass die
          Anonymität der Benutzer:innen gewährleistet ist. Anhand der Ja/Nein-
          oder Weiß nicht/Weiter-Antworten können die Nutzer:innen die
          prozentuale Übereinstimmung oder Abweichung zwischen ihren eigenen
          Positionen und denen der Parteien vergleichen, die nach dem Ausfüllen
          des Fragebogens in einem Diagramm mit Prozentzahlen und einer
          Rangliste zusammengefasst werden. Das Programm berechnet den Grad der
          Übereinstimmung oder Nichtübereinstimmung anhand einer mathematischen
          Gleichung.
        </BodyText>
        <BodyText size="large">
          Je nach Antwort werden unterschiedliche Werte generiert. Der Wert ist
          1 , wenn die Antworten der Parteien und der Nutzer:innen identisch
          sind, minus 1, wenn die Antworten unterschiedlich sind. Die Weiß
          nicht/Weiter-Antworten und das Überspringen von Fragen, d. h. wenn die
          Nutzer:innen bei einer oder mehreren Fragen keine der
          Antwortmöglichkeiten nutzen, werden diese Fragen nicht in Berechnungen
          verwendet. Am Ende weist das Programm die Nutzer:innen darauf hin,
          dass das Ergebnis auf der Grundlage der mit Ja oder Nein beantworteten
          Fragen berechnet wurde.
        </BodyText>
        <BodyText size="large">
          Für die Entwickler:innen von Wahlrechner bestand die erste und
          wichtigste Aufgabe darin, die Grundsätze und Ziele des Programms
          festzulegen, nämlich Wissenschaftlichkeit, Objektivität und
          parteipolitische Neutralität.
        </BodyText>
        <TitleText tag="h2" size="large"
          >Wer sind die Projektpartner?</TitleText
        >
        <BodyText size="large">
          <ul>
            <li>
              <strong
                >Gründungsverein Österreichische Demokratiestiftung</strong
              >
              <p>
                Die Österreichische Demokratiestiftung (Gründungsverein) ist
                unabhängig, überparteilich und fördert demokratische
                Auseinandersetzungen. Ziel der Österreichischen
                Demokratiestiftung ist es, dauerhaft Projekte und Ideen zu
                unterstützen oder umzusetzen, die demokratiepolitische
                Grundlagen vermitteln, verstärken und die demokratische
                Infrastruktur stärken. Für Wahlrechner.at ist die
                Österreichische Demokratiestiftung für Projektmanagement
                verantwortlich.
              </p>
            </li>
            <li>
              <strong>KohoVolit.eu</strong>
              <p>
                KohoVolit.eu ist der Betreiber der weitverbreitetsten Wahlhilfe
                (Wahlrechner) in Mitteleuropa. Seit 2006 erstellt das Projekt
                Wahlrechner in Tschechien und Slowakei und war bereits an der
                Entwicklung solcher Anwendungen in insgesamt 7 Ländern
                beteiligt. Mittlerweile werden regelmäßig mehrere “Wahlrechner”
                pro Jahr in drei Ländern erstellt. KohoVolit.eu stellt dem
                Projekt Wahlrechner.at die Software und sein langjähriges
                Know-how zur Umsetzung von anderen Wahlrechnern zur Verfügung.
              </p>
            </li>
            <li>
              <strong>Vokskabin.hu/Andrássy Universität Budapest</strong>
              <p>
                Die ungarische online Wahlhilfe, Vokskabin ist die gemeinsame
                Initiative der deutschsprachigen Andrássy Gyula Universität
                Budapest (AUB) und des Netzwerks Politische Kommunikation
                (netPOL). Für Wahlrechner.at werden Vokskabin und die AUB
                Unterstützung in den Bereichen redaktionelle Arbeit, Fundraising
                und Kommunikation leisten.
              </p>
            </li>
            <li>
              <strong>wahbeobachtung.org </strong>
              <p>
                Wahlbeobachtung.org ist eine unparteiische Arbeitsgemeinschaft
                internationaler Wahlbeobachter:innen, mit dem Ziel der
                Verbesserung österreichischer Wahlprozesse und einem besseren
                Verständnis für Wahlen speziell bei Jungwähler:innen.
              </p>
            </li>
            <li>
              <strong>PolEdu - Politics & Education </strong>
              <p>
                PolEdu ist ein parteiunabhängiger Verein für politische Bildung
                mit Sitz in Wien. Für Wahlrechner.at wird PolEdu den Kontakt zu
                jungen Menschen herstellen und die politischen Inhalte in eine
                jugendgerechte Sprache bringen.
              </p>
            </li>
          </ul>
        </BodyText>
        <TitleText size="large" tag="h2">
          Wie finanziert sich wahlrechner.at?
        </TitleText>
        <BodyText size="large">
          Wahlrechner.at soll ein Projekt aus der Zivilgesellschaft für die
          Zivilgesellschaft sein. Kooperierenden NGOs unterstützen das Projekt
          durch freiwillige Mitarbeit während der Pilotphase. Spenden werden zur
          Unterstützung des Projektes gesammelt. Mittel, die im Zuge des
          Pilotprojektes nicht verbraucht werden, werden für die Verbesserung
          der technischen Infrastruktur genutzt, um Wahlrechner als
          maßgebliche VAA in Österreich zu positionieren.
        </BodyText>
      </StackComponent>
      <DonateBlock />
      <FooterMultiWord />
    </StaticContentLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.section {
  padding: 40px 0;
}
</style>
