import BodyText from '@/components/design-system/typography/BodyText.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import CardComponent from './CardComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import TimelineComponent from './TimelineComponent.vue';
import TimelineItemComponent from './TimelineItemComponent.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Containers/TimelineComponent',
  component: TimelineComponent,
} as Meta<typeof TimelineComponent>;

export const WithCards: StoryFn<typeof TimelineComponent> = () => ({
  components: {
    BodyText,
    ButtonComponent,
    CardComponent,
    TitleText,
    TimelineComponent,
    TimelineItemComponent,
  },
  template: `
    <TimelineComponent>
      <TimelineItemComponent v-for="a in 6">
        <CardComponent corner="top-right" padding="medium" border shadow>
          <div class="card-content">
            <div class="card-content-text">
              <TitleText tag="h3" size="medium">Komunální volby 2022</TitleText>
              <BodyText size="small">Komunální kalkulačku vyplnilo přes 100 tisíc lidí.</BodyText>
            </div>
          </div>
        </CardComponent>
      </TimelineItemComponent>
      <TimelineItemComponent last>
        <CardComponent corner="top-right" padding="medium" border shadow>
          <div class="card-content">
            <TitleText size="extra-small" tag="h5">Tohle je poslední položka</TitleText>
          </div>
        </CardComponent>
      </TimelineItemComponent>
    </TimelineComponent>
  `,
});
