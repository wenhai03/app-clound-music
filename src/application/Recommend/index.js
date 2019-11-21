import React, { useEffect } from 'react'
import Slider from '../../components/slider/'
import { connect } from "react-redux"
import { forceCheck } from 'react-lazyload'
import * as actionTypes from './store/actionCreators'
import RecommendList from '../../components/list/'
import Loading from '../../baseUI/loading/index'
import Scroll from '../../baseUI/scroll/index'
import { renderRoutes } from 'react-router-config'
import { Content } from './style'

function Recommend(props){
  const { bannerList, recommendList } = props
  
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props
  
  useEffect(() => {
    // 如果页面有数据，则不发请求
    // immutable数据结构中长度属性size
    if (!bannerList.size) {
      getBannerDataDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch()
    }
    // eslint-disable-next-line
  }, []);
  
  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() :[]
  
  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
      { props.enterLoading ? <Loading /> : null}
      { renderRoutes(props.route.routes) }
    </Content>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList())
    },
  }
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))
