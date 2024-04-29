<script setup>
import IconBadge from '@/components/design-system/icons/IconBadge.vue'
import StackComponent from '@/components/design-system/layout/StackComponent.vue';

import {
  vkiLogoInFavour,
  vkiLogoAgainst,
} from '@/components/design-system/icons';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
</script>

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Nicht konformes Beispiel

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Konformes Beispiel

</StackComponent>

## 1. Die Frage muss lauten, was die gewählten Politiker beeinflussen können.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Österreich sollte die EU verlassen (Frage bei den Regionalwahlen).

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Österreich sollte aus der EU austreten (Frage bei den Nationalratswahlen).

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Ich möchte, dass Wien bei den nächsten Wahlen zu einem Einwahlsystem zurückkehrt (Frage bei den Gemeinderatswahlen).

</StackComponent>

## 2. Die Frage sollte mit Ja oder Nein beantwortet werden und nicht zu einer Antwort führen.

Bei der Gestaltung von Fragen müssen wir uns vorstellen können, dass die Menschen sowohl Ja- als auch Nein-Antworten wählen werden. Die Frage sollte auch nicht suggestiv (leitend) sein.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Sollte die Verkehrssituation in Považský Chlmec und Vraní verbessert werden?

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Ich möchte, dass die Opencard für die Fahrgäste nicht kostengünstiger ist als eine "Papierstraßenbahn", damit die Fahrgäste wählen können. (die Frage führt zu einer "Ja"-Antwort).

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Sollte in Rajcianka ein Rastplatz gebaut werden? (nur unter der Voraussetzung, dass allgemein bekannt ist, worum es sich handelt, dass in der Stadt viel darüber diskutiert wird, dass man weiß, wie viel es kosten würde, usw.).

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Sollte mindestens 1 % des Verkehrsbudgets der Stadt für den Radverkehr bereitgestellt werden?

</StackComponent>

## 3. Die Fragen sollten wichtig sein

Wir berücksichtigen z. B., wofür der Rat/das Parlament die meisten öffentlichen Gelder ausgibt.

Wir wählen Themen, die für alle Wählergruppen relevant sind (Alter, Einkommen, Interessen).

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Sollte sich die Stadt bei Frau M. Lorenz und Herrn Cejthamra für die Äußerungen während dieser Konfrontation entschuldigen?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Würden Sie für die Abschaffung der Garantie und den automatischen Eintritt in die zweite Säule stimmen?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Würden Sie für das Vertrauen in die Regierung und die Beibehaltung des Euro stimmen?

</StackComponent>

## 4. Die Frage sollte so spezifisch wie möglich sein.

Die Antwort soll nach 4 Jahren (am Ende der Wahlperiode) überprüft werden können.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Sollte die Entwicklung im Stadtzentrum verdichtet werden?

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Meiner Meinung nach sollte eine Schnellstraße vom Flughafen Ruzyně ins Zentrum von Prag gebaut werden. (Die richtige Antwort wäre: Ich werde mich dafür einsetzen, dass in den nächsten 4 Jahren eine Schnellstraße vom Flughafen ins Zentrum von Prag gebaut wird)

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Sollte der Preis für Fahrkarten im öffentlichen Nahverkehr für Senioren und Studenten um 10 % gesenkt werden?

</StackComponent>

## 5. Die Frage muss kurz und klar sein

Wir möchten, dass der Befragte die Fragen tatsächlich liest und versteht. Deshalb formulieren wir sie in maximal 20 Wörtern und beschränken jede Beschreibung auf 50 Wörter.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Würden Sie stimmen für:

die Abschaffung des Sozialgeldes für Alleinerziehende, die Kürzung des Geburtsgeldes nur für Eltern mit geringem Einkommen, einen einheitlichen Gesamtbetrag des Elterngeldes (220 000 CZK) und eine größere Flexibilität bei der Wahl der Höhe und der Dauer des Elterngeldes, die Kürzung des Betreuungsgeldes, die Kürzung des Arbeitslosengeldes und die Abschaffung der Möglichkeit eines Zuschusses zum Arbeitslosengeld in Höhe des Mindesteinkommens, die Einführung eines Existenzgründerzuschusses, die Verschärfung der Bedingungen für den Anspruch auf Krankengeld und Mutterschaftsgeld für Selbständige?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Ich bin mit der Einführung von Drehkreuzen in der U-Bahn einverstanden.

</StackComponent>

## 6. Fragen mit Beschreibungen müssen auch ohne sie Sinn machen

Viele Menschen lesen nur die Frage selbst und nicht die Beschreibung. Es kann vorkommen, dass die Beschreibung auf einem mobilen Gerät nicht angezeigt wird.

<br />

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Würden Sie dafür stimmen, die Garantie zu entfernen und automatisch in die zweite Säule einzusteigen?

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Glauben Sie, dass es sinnvoll ist, sich ähnlichen Projekten anzuschließen?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Ich bin für die Erhebung von Gebühren für die Einfahrt ins Stadtzentrum, zum Beispiel in Form einer Maut.

</StackComponent>

## 7. Wir bevorzugen Fragen in der positiven Form und vermeiden die verwirrende doppelte Negativform

Das folgende Beispiel zeigt, dass die doppelte Verneinung irreführend und ungenau ist.

<br />

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Es sollte kein Atommülllager in den Highlands geben, egal um welchen Preis

Tatsächlich ist hier nicht klar, womit der Befragte nicht einverstanden ist:

a) nein, es sollte nicht gebaut werden,

b) nicht einverstanden, es sollte gebaut werden.

Eine richtig formulierte Frage müsste lauten: "Sollte der Landkreis alles tun, um den Bau eines Atommülllagers zu verhindern?").

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Gymnasien sollten weiterhin zu größeren Einheiten zusammengelegt werden.

Nicht "Gymnasien sollten nicht mehr zu größeren Einheiten zusammengelegt werden".

## 8. Die Frage muss in einfacher Sprache formuliert sein

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Die Fragen werden so formuliert, dass sie von verschiedenen gesellschaftlichen Gruppen verstanden werden können.

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Der neue Flächennutzungsplan muss den Bau von Hochhäusern regeln, die die Prager Skyline verschandeln können.

<br />

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Der neue Flächennutzungsplan muss den Bau von Hochhäusern regeln, die die Prager Skyline verschandeln können.

## 9. Wir wählen auch Themen aus, die interessant sind, obwohl sie nicht ganz so wichtig sind.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Würden Sie für den Vorschlag stimmen, den Abgeordneten farblich zu signalisieren, wie sie abstimmen sollen?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Würden Sie für das Gesetz "Václav Havel hat zu Freiheit und Demokratie beigetragen" stimmen?

</StackComponent>
