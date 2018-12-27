/**
 * Created by 12973 on 2018/8/8.
 */
import * as types from '../mutation-types'

const authors = [
  [{
    img:require('../../assets/img/editor11.jpg'),
    name:'一支只',
    description:'写了619k字 · 1.5k喜欢'
  },
    {
      img:require('../../assets/img/editor2.jpg'),
      name:'三儿王禹',
      description:'写了198k字 · 1.4k喜欢'
    },
    {
      img:require('../../assets/img/editor6.jpg'),
      name:'只有一半影子的人',
      description:'写了345.2k字 · 260喜欢'
    },
    {
      img:require('../../assets/img/editor3.jpg'),
      name:'虚僧',
      description:'写了208.5k字 · 615喜欢'
    }],
  [{
    img:require('../../assets/img/editor11.jpg'),
    name:'一支只2',
    description:'写了619k字 · 1.5k喜欢'
  },
    {
      img:require('../../assets/img/editor2.jpg'),
      name:'三儿王禹2',
      description:'写了198k字 · 1.4k喜欢'
    },
    {
      img:require('../../assets/img/editor6.jpg'),
      name:'只有一半影子的人2',
      description:'写了345.2k字 · 260喜欢'
    },
    {
      img:require('../../assets/img/editor3.jpg'),
      name:'虚僧2',
      description:'写了208.5k字 · 615喜欢'
    }],
  [{
    img:require('../../assets/img/editor11.jpg'),
    name:'一支只3',
    description:'写了619k字 · 1.5k喜欢'
  },
    {
      img:require('../../assets/img/editor2.jpg'),
      name:'三儿王禹3',
      description:'写了198k字 · 1.4k喜欢'
    },
    {
      img:require('../../assets/img/editor6.jpg'),
      name:'只有一半影子的人3',
      description:'写了345.2k字 · 260喜欢'
    },
    {
      img:require('../../assets/img/editor3.jpg'),
      name:'虚僧3',
      description:'写了208.5k字 · 615喜欢'
    }],
  [{
    img:require('../../assets/img/editor11.jpg'),
    name:'一支只4',
    description:'写了619k字 · 1.5k喜欢'
  },
    {
      img:require('../../assets/img/editor2.jpg'),
      name:'三儿王禹4',
      description:'写了198k字 · 1.4k喜欢'
    },
    {
      img:require('../../assets/img/editor6.jpg'),
      name:'只有一半影子的人4',
      description:'写了345.2k字 · 260喜欢'
    },
    {
      img:require('../../assets/img/editor3.jpg'),
      name:'虚僧4',
      description:'写了208.5k字 · 615喜欢'
    }]
];





let i= 0;
const state = {
  authors:authors[i]
};

const mutations = {
  [types.ANOTHER_AUTHORS](state){
    i === authors.length-1? i=0:i++;
    state.authors = authors[i];
  }
};


export default {
  state,
  mutations
}
