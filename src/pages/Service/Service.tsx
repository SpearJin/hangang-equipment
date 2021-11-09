import { dom } from '@/utils/babel';
import { Node } from '@/components';
import styles from './Service.module.scss';
import { generateClassName } from '@/utils';

import ServiceTypeA from '@/components/ServiceType/ServiceTypeA';
import ServiceTypeB from '@/components/ServiceType/ServiceTypeB';
import ServiceQuestion from '@/components/ServiceType/ServiceQuestion';

import { heatingInfo, leakingInfo, pipeInfo, questionInfo, repairsInfo } from './ServiceData';

import icon1 from './assets/icon/service1.svg';
import icon2 from './assets/icon/service2.svg';
import icon3 from './assets/icon/service3.svg';
import icon4 from './assets/icon/service4.svg';

const serviceData = {
  first: pipeInfo,
  second: heatingInfo,
  three: leakingInfo,
  four: repairsInfo,
};

/** @jsx dom */
class Tap extends Node {
  template() {
    return (
      <ul class={styles.service__list}>
        <li class={generateClassName('tab', styles.service__card, styles.selected)} data-type="pipe">
          <img src={icon1} class={styles.card__icon} />
          <span>배관</span>
        </li>
        <li class={generateClassName('tab', styles.service__card)} data-type="heating">
          <img src={icon2} class={styles.card__icon} />
          <span>난방</span>
        </li>
        <li class={generateClassName('tab', styles.service__card)} data-type="leaking">
          <img src={icon3} class={styles.card__icon} />
          <span>누수</span>
        </li>
        <li class={generateClassName('tab', styles.service__card)} data-type="repairs">
          <img src={icon4} class={styles.card__icon} />
          <span>집수리</span>
        </li>
      </ul>
    );
  }
}

interface State {
  // data: TypeAProps | TypeBProps;
  type: string;
  tab: keyof typeof questionInfo;
  data: {
    title: {
      name: string;
      icon: string;
    };
    content: {
      name: string;
      img: string;
    }[];
  };
}

export default class Service extends Node<unknown, State> {
  constructor() {
    super();

    this.state = {
      data: pipeInfo,
      type: 'A',
      tab: 'pipe',
    };
  }

  typeSelect(info: string) {
    if (info === 'pipe') {
      this.setState({ data: serviceData.first, type: 'A', tab: info });
    } else if (info === 'heating') {
      this.setState({ data: serviceData.second, type: 'A', tab: info });
    } else if (info === 'leaking') {
      this.setState({ data: serviceData.three, type: 'B', tab: info });
    } else if (info === 'repairs') {
      this.setState({ data: serviceData.four, type: 'B', tab: info });
    }
  }

  onClickBtn = (e: Event) => {
    const target = e.target as HTMLElement;
    const $button = target.closest('.tab') as HTMLElement;
    if (!$button) return;

    this.typeSelect($button.dataset.type);
    this.selected(e);
  };

  selected(e: Event) {
    const selecte = document.querySelector('[class*=selected]');
    const target = e.target as HTMLElement;
    const $target = target.closest('.tab');
    if ($target instanceof HTMLElement) {
      document.querySelectorAll('.tab').forEach(($tab: HTMLElement) => {
        if ($tab.dataset.type === $target.dataset.type) {
          selecte.classList.remove(styles.selected);
          $tab.classList.add(styles.selected);
        }
      });
    }
  }

  template() {
    return (
      <div class={styles.service} onclick={this.onClickBtn}>
        <Tap />
        {this.state.type === 'A' ? <ServiceTypeA info={this.state.data} /> : <ServiceTypeB info={this.state.data} />}
        <ServiceQuestion questionInfo={questionInfo[this.state.tab]} />
      </div>
    );
  }
}
