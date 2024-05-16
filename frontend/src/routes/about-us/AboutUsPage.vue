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
        <HeadlineText tag="h1" size="large">A Voksmonitorról</HeadlineText>
        <BodyText size="large">
          Mi az a Voksmonitor? Hogyan használható és hogyan működik? Ki áll
          mögötte? Hogyan jönnek létre és hogyan értékelik a kérdéseket? Az
          alábbiakban mindent megtudhat ezekről a témákról.
        </BodyText>

        <TitleText size="large" tag="h2">Mi az a Voksmonitor?</TitleText>
        <BodyText size="large">
          A Voksmonitor (választási kalkulátor) egy olyan online alkalmazás,
          amely összehasonlítja az Ön politikai véleményét az adott választáson
          induló politikai pártok vagy konkrét jelöltek álláspontjával. A
          Voksmonitorhoz hasonló magyar (pl. Vokskabin) és külföldi
          (pl.Stemwijzer, Wahl-O-Mat,Wahlrechner) választási kalkulátorok
          történetéről és a világ minden tájáról származó sikeres példákról
          bővebben a Wikipédián olvashat. A Voksmonitor célja, hogy a választók
          ne csak a pártok kommunikációján keresztül találkozzanak a politikai
          elképzelésekkel, hanem megismerjék azok konkrét programját és
          szakmai-politikai ügyekben foglalt álláspontját és így megtudják, hogy
          melyik párt álláspontja áll a legközelebb és legtávolabb az ő
          elképzeléseiktől.
        </BodyText>

        <TitleText size="large" tag="h2">
          Ki és hogyan készíti el a választási kalkulátort?
        </TitleText>
        <BodyText size="large">
          A választási kalkulátort a K-Monitor munkatársai készítik el és a
          KohoVolit.eu-val közösen fejlesztik és üzemeltetik. A Voksmonitor 2014
          óta működik és az országgyűlési, európai parlamenti illetve
          önkormányzati (ill. főpolgármesteri) választásokra készíti el magyar
          és angol nyelvű választási kalkulátorát. A Voksmonitorban megjelenő
          kérdéseket először a választásokon listát vagy jelöltet állító
          pártoknak küldjük el, akiknek lehetőségük nyílik megválaszolni ezeket
          illetve megjegyezéseket fűzni a kérdésekhez, amennyiben szükségesnek
          érzik. Ha egy párt nem válaszol, a K-Monitor a pártok politikai
          programját és kommunikációját, illetve adott esetben a már meghozott
          intézkedéseket veszi alapul a válaszok kialakításánál. Ez felvetheti
          annak a lehetőségét, hogy a választ nem adó párt hivatalos
          álláspontjától eltérhetnek a válaszok. Fontos azonban megjegyezni,
          hogy a K-Monitor minden, az alkalmazásban szereplő politikai párt és
          jelöltnek megadja a lehetőséget ezek korrigálására, így a pártok
          jelezhetik, ha valamit javítani szeretnének, az eredmények között
          pedig világosan megjeleníti, hogy saját, vagy szakértői értékelés
          alapján kódolt válaszról van-e szó.
        </BodyText>

        <TitleText size="large" tag="h2"
          >Hogyan választjuk ki a kérdéseket, a kalkulátorban megjelenő
          témákat?</TitleText
        >
        <BodyText size="large">
          Különösen egy választási kalkulátorban kulcsfontosságú a kérdések
          kiválasztása és megfogalmazása. Elsőként kiválasztjuk az adott
          választás szempontjából legrelevánsabb és legfontosabb témaköröket és
          ezekhez kapcsolódó állításokat fogalmazunk meg. Az esetek túlnyomó
          többségében több kérdést küldünk a pártoknak vagy jelölteknek, mint
          amennyit a végleges kalkulátorban felhasználunk. Jellemzően azokat a
          kérdéseket, amelyekben a jelöltek között egyetértés van, nem
          használjuk fel (azaz az ilyen kérdések nem osztják meg a jelölteket).
          Azokat a kérdéseket, amikre a pártok eltérő választ adnak, tehát nem
          alakul ki teljes konszenzus, felhasználjuk a választási kalkulátorhoz.
          A kérdések és a hozzájuk tartozó kiegészítő információk, amik a kérdés
          pontosabb megértését szolgálják, a választást megelőző pár hétben
          magyar és angol nyelven állnak a kitöltők rendelkezésére.
        </BodyText>

        <TitleText size="large" tag="h2"
          >Hogyan értékeljük a válaszokat?</TitleText
        >
        <BodyText size="large">
          Az olyan kérdéseket, amelyekre a felhasználók nem "igen"-nel vagy
          "nem"-mel válaszolnak, a program nem számítja bele az eredménybe. Ha a
          kitöltő egy kérdésre "igen”-nel válaszol, akkor azok a pártok vagy
          jelöltek, akik szintén "igen”-nel válaszoltak, egy pontot kapnak. Azok
          a pártok vagy jelöltek, akik "nem"-mel válaszolnak, egy pontot
          veszítenek. Ha viszont "nem" választ ad, a szintén "nem" választ adó
          pártok vagy jelöltek egy-egy pontot kapnak. Azok, akik az aktuális
          kérdésre “igen" választ adtak, egy pontot veszítenek. Azok a pártok
          vagy jelöltek, akik az adott kérdésre nem adtak "igen" vagy "nem"
          választ, nem kapnak és nem is veszítenek pontot. Ezután minden egyes
          párt vagy jelölt esetében az "igen" vagy "nem" válasszal megválaszolt
          kérdésekre kapott pontokat össze kell adni, és az eredményt el kell
          osztani az ilyen kérdések számával. A végeredményt a 0% és 100%
          közötti tartományra átszámítva kapjuk meg a megjelenített eredményt,
          ami a kitöltő és az adott párt álláspontjának hasonlóságát mutatja.
        </BodyText>

        <TitleText size="large" tag="h2"> A kérdések súlyozása </TitleText>
        <BodyText size="large">
          Az alkalmazás használói minden kérdésnél külön beállíthatják, hogy
          mennyire fontos nekik az adott téma, azaz a kérdésre adott válaszuk
          milyen súllyal szerepeljen az összesítésben. A két prioritási szint
          (normál, magas) mindegyike súlyt kap, és az általános konszenzus
          ezután az egyes kérdések vagy szavazások konszenzusának súlyozott
          átlaga. Ahelyett, hogy a konszenzushoz hozzáadnánk vagy levonnánk egy
          pontot, a kérdés vagy szavazás súlyát adjuk hozzá vagy vonjuk le, és a
          végén nem a kérdések vagy szavazatok számával, hanem a súlyok abszolút
          értékeinek összegével osztjuk. A súlyok meghatározásának módszere
          olyan, hogy a nagy fontosságú súly kétszerese a közönséges fontosságú
          súlynak. Egyes esetekben előfordulhat, hogy két vagy több párttal vagy
          jelölttel is egyenlő mértékű egyezést mutat az eredmény. Ilyen esetben
          a felek vagy személyek sorrendje véletlenszerűen kerül meghatározásra.
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
