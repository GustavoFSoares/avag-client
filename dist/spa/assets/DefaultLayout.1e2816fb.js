import{u as A}from"./use-quasar.12fa7abd.js";import{A as D}from"./AvCard.ee962444.js";import{O as y,P as S,Q as N,f as p,r as $,R as _,y as c,z as d,H as e,k as o,C as h,E as O,I as i,N as m,G as Q,S as B,U as I,B as x,F as L,D as U,A as H}from"./index.28c10cb6.js";import{V}from"./vue-avatar-creator.es.5dc6a743.js";import{A as q}from"./AvReward.b9464a1b.js";/* empty css                                                             */const z=s=>(B("data-v-c525c616"),s=s(),I(),s),R={class:"avatar"},T={class:"user-card-header__container"},F={class:"user-info"},P={class:"user-info__name"},E={class:"user-info__level"},G={class:"user-edit"},j=z(()=>e("div",{class:"level-bar-progress"},null,-1)),J={class:"level-bar-index"},W={class:"level-bar-index__start"},X={class:"level-bar-index__end"},Y="modules.home.userCard",Z={__name:"UserCardHeader",props:{isClose:{type:Boolean,required:!0}},setup(s){const t=S();N();const a=p(()=>t.getters["AuthModule/userData"]),r=p(()=>t.getters["AuthModule/avatar/avatarOptions"]),l=p(()=>t.getters["AuthModule/rewardsData"]),n=$({start:1e3,end:2e3}),u=p(()=>l.value.points/n.value.end*100),g=v=>v.toLocaleString("pt-BR");return(v,M)=>{const b=_("QAvatar"),f=_("router-link"),C=_("QBtn");return c(),d("div",{class:i(["user-card-header",{"user-card-header--is-close":s.isClose}])},[e("div",R,[o(f,{to:{name:"user.edit-avatar"}},{default:h(()=>[o(b,{color:"white"},{default:h(()=>[o(O(V),{"view-mode":"",data:r.value},null,8,["data"])]),_:1})]),_:1},8,["to"])]),e("div",T,[e("div",{class:i(["user",{"user--is-close":s.isClose}])},[e("div",F,[e("h5",P,m(a.value.name),1),e("h6",E,m(a.value.levelName),1)]),e("div",G,[o(C,{flat:"",round:"",icon:"edit",color:"primary",to:{name:"user.edit"},title:v.$t(`${Y}.editUser`)},null,8,["to","title"])])],2),e("div",{class:i(["level-bar",{"level-bar--is-close":s.isClose}]),style:Q({"--bar-progress":`${u.value}%`})},[j,e("div",J,[e("div",W,m(g(n.value.start)),1),e("div",X,m(g(n.value.end)),1)])],6),o(q,{points:l.value.points,coins:l.value.coins},null,8,["points","coins"])])],2)}}};var K=y(Z,[["__scopeId","data-v-c525c616"]]);const ee={name:"OpenMenuButton",props:{isLoggedIn:{type:Boolean,required:!0},isMenuOpen:{type:Boolean,required:!0}}},se=s=>(B("data-v-c43ec48c"),s=s(),I(),s),te=se(()=>e("div",{class:"menu-button__content"},[e("span",null,"Menu")],-1)),ae=[te];function oe(s,t,a,r,l,n){return c(),d("button",{class:i(["menu-button",{"menu-button--active":a.isMenuOpen}]),onClick:t[0]||(t[0]=u=>s.$emit("clicked"))},ae,2)}var ne=y(ee,[["render",oe],["__scopeId","data-v-c43ec48c"]]);const re={class:"navigation"},le={class:"navigation-item__text"},ce={__name:"index",props:{showMenu:{type:Boolean,default:!1}},emits:["navigating","toggleMenu"],setup(s,{emit:t}){const a=$(!1),r=A(),l={insights:{route:"home.insights",icon:"o_widgets"},courses:{route:"home.activities",icon:"o_layers"}},n=p(()=>r.screen.sm||r.screen.xs),u=()=>{t("toggleMenu")},g=()=>{t("navigating")},v=()=>{a.value=!a.value};return(M,b)=>{const f=_("QIcon"),C=_("router-link");return c(),d("div",{class:i(["user-card",{"user-card--is-close":a.value}])},[o(D,{class:"user-card__wrapper","header-color":"primary","no-border-radius":n.value},{header:h(()=>[n.value?x("",!0):(c(),d("button",{key:0,class:"user-card__open-card-button",onClick:v},[o(f,{name:"chevron_right",size:"22px"})])),o(K,{"is-close":a.value},null,8,["is-close"])]),default:h(()=>[e("div",re,[(c(),d(L,null,U(l,(w,k)=>o(C,{class:i(["navigation-item",{"navigation-item--is-closed":a.value}]),key:k,to:{name:w.route},onClick:g},{default:h(()=>[o(f,{class:"navigation-item__icon",name:w.icon},null,8,["name"]),e("h4",le,m(M.$t(`modules.${k}.seo.title`)),1)]),_:2},1032,["class","to"])),64))])]),_:1},8,["no-border-radius"]),n.value?(c(),H(ne,{key:0,class:"user-card__toggle-button",isMenuOpen:s.showMenu,onClick:u},null,8,["isMenuOpen"])):x("",!0)],2)}}};var ie=y(ce,[["__scopeId","data-v-48ad32a4"]]);const ue={class:"app-container__wrapper"},_e={class:"app-container__content"},de={class:"default-layout"},ve={class:"default-layout__content"},pe={__name:"DefaultLayout",setup(s){const t=$(!1),a=()=>{t.value=!1},r=()=>{t.value=!t.value};return(l,n)=>{const u=_("router-view");return c(),d("div",ue,[e("div",_e,[e("section",de,[e("article",{class:i(["default-layout__user-navigation",{"default-layout__user-navigation--active":t.value}])},[o(ie,{onToggleMenu:r,onNavigating:a,"show-menu":t.value},null,8,["show-menu"])],2),e("aside",ve,[o(u)])])])])}}};var $e=y(pe,[["__scopeId","data-v-22437f25"]]);export{$e as default};
