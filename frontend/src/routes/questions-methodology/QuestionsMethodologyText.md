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

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Schlechtes Beispiel

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Gutes Beispiel

</StackComponent>

## 1. Die Frage muss auf ein Thema bezogen sein, auf das die gewählten Politiker:innen Einfluss haben.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Österreich sollte die EU verlassen (Frage bei einer Landtagswahl).

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Österreich sollte aus der EU austreten (Frage bei den Nationalratswahlen).

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Ich möchte, dass Wien flächendeckend Tempo 30 einführt. (Frage bei den Gemeinderatswahlen).

</StackComponent>

## 2. Die Frage sollte mit Ja oder Nein beantwortet werden können und nicht suggestiv gestellt sein.

Bei der Gestaltung von Fragen müssen wir uns vorstellen können, dass die Menschen sowohl Ja- als auch Nein-Antworten wählen werden. Die Frage sollte auch nicht suggestiv (leitend) sein.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Sollte die Verkehrssituation in St. Pölten verbessert werden? (Impliziert, dass die Verkehrssituation in St. Pölten Verbesserung braucht)

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Ich möchte, dass Wien flächendeckend Tempo 30 einführt.

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Sollte mindestens 1% des Verkehrsbudgets der Stadt für den Radverkehr bereitgestellt werden?

</StackComponent>

## 3. Die Fragen sollten wichtig sein

Wir berücksichtigen beispielsweise Themen, für die der Rat/das Parlament die meisten öffentlichen Gelder bereitstellt. 

Wir wählen Themen aus, die für alle Wählergruppen relevant sind (Alter, Einkommen, Interessen).

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Sollte sich die Stadt bei Frau M. Lorenz und Herrn Cejthamra für die Äußerungen während dieser Konfrontation entschuldigen?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Würden Sie für die Abschaffung der Garantie und den automatischen Eintritt in die zweite Säule stimmen?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Würden Sie für das Vertrauen in die Regierung und die Beibehaltung des Euro stimmen?

</StackComponent>

## 4. Die Frage sollte so spezifisch wie möglich sein.

Die Antwort soll nach Ende einer Legislaturperiode bzw. vor der nächsten Wahl überprüft werden können.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Die Landesregierung soll den öffentlichen Verkehr weiterentwickeln.

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Die Landesregierung soll mehr Gelder in den öffentlichen Verkehr investieren als in der vergangenen Legislaturperiode.

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Sollte der Preis für Fahrkarten im öffentlichen Nahverkehr für Senior:innen und Studierende um 10% gesenkt werden?

</StackComponent>

## 5. Die Frage muss kurz und klar sein

Wir möchten, dass die Fragen auch ohne viel Vorwissen verstanden werden. Deshalb formulieren wir sie in maximal 20 Wörtern und beschränken die jeweiligen Zusatzinfos auf 50 Wörter.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Würden Sie stimmen für:

die Abschaffung des Sozialgeldes für Alleinerziehende, die Kürzung des Geburtsgeldes nur für Eltern mit geringem Einkommen, einen einheitlichen Gesamtbetrag des Elterngeldes (220 000 CZK) und eine größere Flexibilität bei der Wahl der Höhe und der Dauer des Elterngeldes, die Kürzung des Betreuungsgeldes, die Kürzung des Arbeitslosengeldes und die Abschaffung der Möglichkeit eines Zuschusses zum Arbeitslosengeld in Höhe des Mindesteinkommens, die Einführung eines Existenzgründerzuschusses, die Verschärfung der Bedingungen für den Anspruch auf Krankengeld und Mutterschaftsgeld für Selbständige?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Ich bin mit der Einführung von Drehkreuzen in der U-Bahn einverstanden.

</StackComponent>

## 6. Fragen sollen auch ohne Zusatzinformation Sinn ergeben

Viele Menschen lesen nur die Frage selbst und nicht die dazugehörige Beschreibung. Es kann vorkommen, dass die Beschreibung auf einem mobilen Gerät nicht angezeigt wird.

<br />

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Glauben Sie, dass es sinnvoll ist, sich ähnlichen Verkehrsprojekten wie in Tirol anzuschließen?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Ich bin für die Erhebung einer Maut für die Einfahrt von Privat-PKW in den 1. Wiener Gemeindebezirk.

</StackComponent>

## 7. Wir bevorzugen Fragen in der positiven Form und vermeiden die verwirrende doppelte Negativform

Das folgende Beispiel zeigt, dass die doppelte Verneinung irreführend und ungenau ist.
<br />

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Würden Sie nicht zustimmen, dass es nicht unvernünftig wäre, Windräder zur Stromerzeugung in Oberösterreich nicht zu bauen?

Tatsächlich ist hier nicht klar, womit der Befragte nicht einverstanden ist:

a) nein, es sollte nicht gebaut werden,

b) nicht einverstanden, es sollte gebaut werden.

Eine richtig formulierte Frage müsste lauten: Soll die Landesregierung den Bau von Windrädern zur Stromerzeugung in Oberösterreich verhindern?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Kleine Gemeinden sollten zu größeren Einheiten zusammengelegt werden.

Kleine Gemeinden sollten nicht zu größeren Einheiten zusammengelegt werden.

## 8. Die Frage muss in einfacher Sprache formuliert sein

Die Fragen werden so formuliert, dass sie von möchlichst allen Wähler:innen unterschiedlichen Alters, Bildungsgrads oder Herkunft, verstanden werden können.

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Die Wiener Ringstraße soll dauerhaft für den privaten Auto-Verkehr gesperrt werden.

<br />

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Die permanente Exklusion des privaten Autoverkehrs auf der Wiener Ringstraße soll etabliert werden.

## 9. Wir wählen manchmal auch Themen aus, die interessant, aber vielleicht nicht ganz so wichtig sind.

Das soll zur Auflockerung der manchmal vielleicht etwas trockenen Themen dienen.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Würden Sie für den Vorschlag stimmen, den Abgeordneten farblich zu signalisieren, wie sie abstimmen sollen?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Würden Sie für das Gesetz "Václav Havel hat zu Freiheit und Demokratie beigetragen" stimmen?

</StackComponent>
