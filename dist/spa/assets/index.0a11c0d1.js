import{O as m,R as _,y as a,A as d,C as g,H as t,z as o,N as r,a0 as f,I as A,P as y,f as b,D as C,F as x}from"./index.28c10cb6.js";import{A as P}from"./AvPage.0711a41f.js";import{A as k}from"./AvCard.ee962444.js";var q="/assets/on.290e3659.png",S="/assets/off.1dcc3c43.png";const B={name:"AchievementCard",components:{AvCard:k},props:{title:{type:String,required:!0},goalDescription:{type:String,required:!0},goalTarget:{type:Number,required:!0},obtained:{type:Boolean,default:!1},badge:{type:String,default:null}}},N={class:"achievement-card__content"},I={class:"achievement-card__image"},T=["src","alt"],$=["alt"],w=["alt"],z={class:"achievement-card__text-wrapper"},F={class:"achievement-card__title"},H={class:"achievement-card__description"};function V(n,c,e,l,u,v){const i=_("AvCard");return a(),d(i,{class:A(["achievement-card",{"achievement-card--obtained":e.obtained}]),bordered:""},{default:g(()=>[t("div",N,[t("div",I,[e.badge?(a(),o("img",{key:0,class:"conquest-item__image",src:`${n.$appStorage}/${e.badge}`,alt:e.title},null,8,T)):e.obtained?(a(),o("img",{key:1,class:"conquest-item__image",src:q,alt:e.title},null,8,$)):(a(),o("img",{key:2,class:"conquest-item__image",src:S,alt:e.title},null,8,w))]),t("div",z,[t("h5",F,r(e.title),1),t("h6",H,[t("strong",null,r(e.goalTarget),1),f(" - "+r(e.goalDescription),1)])])])]),_:1},8,["class"])}var E=m(B,[["render",V],["__scopeId","data-v-ca98c852"]]);const L="modules.home.insightsPage.pages.achievementPage",M={name:"AchievementsPage",components:{AvPage:P,AchievementCard:E},setup(){const n=y(),c=b(()=>n.getters["AchievementsModule/achievements"]);return{I18N_PATH:L,achievements:c}}},O={class:"achievements-page__list"};function R(n,c,e,l,u,v){const i=_("AchievementCard"),h=_("AvPage");return a(),d(h,{class:"achievements-page","no-header":""},{default:g(()=>[t("div",O,[(a(!0),o(x,null,C(l.achievements,(s,p)=>(a(),d(i,{key:p,title:s.name,"goal-description":s.goal.description,"goal-target":s.goal.target,badge:s.path,obtained:s.obtained},null,8,["title","goal-description","goal-target","badge","obtained"]))),128))])]),_:1})}var J=m(M,[["render",R],["__scopeId","data-v-3d0a6270"]]);export{J as default};
