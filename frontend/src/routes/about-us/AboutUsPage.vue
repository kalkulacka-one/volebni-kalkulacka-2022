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
        <BodyText size="large">
          Wahlrechner.at ist Teil des größten europäischen Netzwerks für Wahl-Entscheidungshilfen. Seit 2006 entwickeln wir unabhängige Online-Tools zur politischen Orientierung – aktuell in sieben Ländern und darüber hinaus. Mit über 100 Wahl-Tools und mehreren zehn Millionen Nutzer:innen haben wir Wählerinnen und Wählern in ganz Europa geholfen, informierte Entscheidungen zu treffen.
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
            <li>KohoVolit.eu</li>
            <li>PolEdu - Politics & Education</li>
            <li>Puls 4</li>
          </ul>
        </BodyText>
        <TitleText size="large" tag="h2"
          >Wie funktioniert wahlrechner.at?
        </TitleText>
        <BodyText size="large">
            Wahlrechner ist ein interaktives Online-Tool mit dem Ziel, die Nutzer:innen über die wichtigsten (gesellschafts-)politischen Fragen einer Wahl zu informieren und ihnen eine Orientierungshilfe über die Positionen der Parteien anzubieten. Wahlrechner wird für verschiedene Wahlen in Österreich angeboten und ermöglicht eine fundierte Entscheidungshilfe für Wähler:innen.
        </BodyText>
        <BodyText size="large">
            Der Wahlrechner stellt den Nutzer:innen rund 20-40 Fragen, die mit Dafür oder Dagegen beantwortet werden können. Zusätzlich kann Weiß nicht/Weiter ausgewählt werden. Die Angaben der Nutzer:innen werden mit den Positionen der Parteien verglichen, sodass eine individuelle Übereinstimmung berechnet wird.
        </BodyText>
        <BodyText size="large">
            Der österreichische Wahlrechner ist Teil eines internationalen Netzwerks und kooperiert auf europäischer Ebene mit VoteMatch.eu. Dies ermöglicht es den Nutzer:innen, ihre Antworten nicht nur mit österreichischen Parteien, sondern bei entsprechenden Wahlen auch mit Parteien aus anderen EU-Ländern zu vergleichen.
        </BodyText>
        <BodyText size="large">
            Ein besonderes Beispiel ist die Europawahl, bei der 15 Fragen aus dem gemeinsamen europäischen Fragenkatalog übernommen werden. Zusätzlich werden bis zu 25 weitere Fragen speziell zu österreichischen Themen erarbeitet, um eine umfassende Wahlhilfe mit bis zu 40 Fragen zu bieten.
        </BodyText>
        <TitleText size="large" tag="h2"
          >Wer soll angesprochen werden?
        </TitleText>
        <BodyText size="large">
          Zielgruppe ist eine möglichst breite Öffentlichkeit, die sich vor Wahlen in Österreich informieren möchte. Wie die Zahlen aus anderen Ländern zeigen, werden Online-Wahlhilfen von Jahr zu Jahr beliebter. Die Online-Wahlhilfe des Projektpartners KohoVolit.eu aus Tschechien erreichte bei den Präsidentschaftswahlen 2023 40 Prozent der Wähler:innen. In Deutschland wurde der Wahl-O-Mat im Vorfeld der letzten Bundestagswahl 2021 21,3 Millionen Mal aufgerufen.
        </BodyText>
        <BodyText size="large">
          Auch in Österreich steigt die Nutzung kontinuierlich: Bei der Europawahl 2024 war unser Wahlrechner die meistgenutzte Wahlhilfe im Land.
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
              <strong>PolEdu - Politics & Education </strong>
              <p>
                PolEdu ist ein parteiunabhängiger Verein für politische Bildung
                mit Sitz in Wien. Für Wahlrechner.at wird PolEdu den Kontakt zu
                jungen Menschen herstellen und die politischen Inhalte in eine
                jugendgerechte Sprache bringen.
              </p>
            </li>
            <li>
              <strong>Puls 4</strong>
              <p>
                Puls 4 ist eine der führenden privaten Fernsehsendergruppen in Österreich und bekannt für ihre politischen Berichterstattungen und Diskussionsformate. Im Rahmen von Wahlrechner.at beteiligt sich Puls 4 aktiv an der Erstellung der Wahlhilfe und unterstützt das Projekt zudem als Medienpartner, um eine breite Öffentlichkeit zu erreichen und die politische Meinungsbildung zu fördern.
              </p>
            </li>
          </ul>
        </BodyText>
        <TitleText size="large" tag="h2">
          Wie finanziert sich wahlrechner.at?
        </TitleText>
        <BodyText size="large">
          Wahlrechner.at soll ein Projekt aus der Zivilgesellschaft für die
          Zivilgesellschaft sein. Das Pilotprojekt wurde durch ehrenamtliche Tätigkeit umgesetzt,
          für die Zukunft ist das Projekt auf Unterstützung durch Spenden angewiesen. 
          Weiters werden Spenden zur Unterstützung des Projektes gesammelt.
        </BodyText>
        <TitleText size="large" tag="h2">
          Wie wird die Übereinstimmung berechnet?
        </TitleText>
        <BodyText size="large">
          Ein Beispiel:<br />
          Wenn Sie 42 Fragen mit ✅ Dafür beantworten und eine Partei hat 37x ✅ Dafür gestimmt, 2x sich nicht festgelegt und 3x ❌ Dagegen gestimmt hat, ergibt sich folgende Rechnung:<br />
          37x Übereinstimmung (Sie stimmten ✅ Dafür, die Partei ✅ Dafür) = 37 Punkte <br />
          2x Keine Festlegung (Sie stimmten ✅ Dafür, die Partei Neutral)= 0 Punkte<br />
          3x Widerspruch (Sie stimmten ✅ Dafür, die Partei ❌ Dagegen) = -3 Punkte<br />
          Ergebnis der Partei: 34 Punkte<br />
          Anzahl der beantworteten Fragen: 42<br />
          Der Rechner überträgt dieses Ergebnis so in eine Prozentangabe (0 % - 100 %):<br />
          ((34 / 42) + 1) / 2 *100 % = <strong>90 %</strong><br />
        </BodyText>
        <TitleText size="large" tag="h2">Nationalratswahl 2024</TitleText>
        <BodyText size="large">
          Die folgende Organisationen haben auch an der Entwicklung des Wahlrechners für die Nationalratswahl 2024 beteiligt:<br/>
          <ul>
            <li>wahlbeobachtung.org</li>
            <li>BIZEPS - Zentrum für selbstbestimmtes Leben</li>
            <li>Meine Abgeordneten - So tickt Österreichs Politik</li>
          </ul>
        </BodyText>
        <TitleText size="large" tag="h2">Europawahl 2024</TitleText>
        <BodyText size="large">
          Der Wahlrechner für die Europawahl 2024 wurde im Rahmen des VoteMatch.eu-Netzwerks erstellt.<br/>
          Dabei haben auch folgende Organisationen mitgewirkt:<br/>
          <ul>
            <li>Gründungsverein Österreichische Demokratiestiftung</li>
            <li>Vokskabin.hu/Andrássy Universität Budapest</li>
          </ul>
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
