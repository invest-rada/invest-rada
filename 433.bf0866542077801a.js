"use strict";(self.webpackChunkinvest_rada=self.webpackChunkinvest_rada||[]).push([[433],{1433:(D,i,s)=>{s.r(i),s.d(i,{WatchlistModule:()=>O});var c=s(6895),u=s(433),l=s(6103),m=s(7860),g=s(1334),f=s(1054),d=s(2543),b=s(9594),h=s(6814),a=s(1571),p=s(2903),v=s(4794),y=s(8117);function C(t,e){if(1&t&&(a.ynx(0),a._UZ(1,"app-widgets-brand",2),a.BQk()),2&t){const o=a.oxw();a.xp6(1),a.Q6J("brandData",o.brandData)("labels",o.labels)("withCharts",!0)}}function W(t,e){1&t&&a._UZ(0,"c-spinner")}const S={borderWidth:2,fill:!0},B={backgroundColor:"rgba(255,255,255,.1)",borderColor:"rgba(255,255,255,.55)",pointHoverBackgroundColor:"#fff"},T=[{path:"",component:(()=>{class t{constructor(o,r){this.stocksData=o,this.brand=r,this.dataStore$=this.stocksData.dataStore$;const n=[];for(let R in h.i3)n.push((0,b.Z)(h.i3,R));this.labels=n}ngOnInit(){this.initBrands()}isLoaded(o){return Object.keys(o).length>0}initBrands(){this.dataStore$.subscribe(o=>{const r=Object.keys(o).map(n=>o[n]);this.brandData=r.map(n=>({icon:this.brand.getIconBySymbol(n.Symbol),symbol:n.Symbol,values:[{title:n.Symbol,value:n.Name},{title:n.Industry}],capBg:{"--cui-card-cap-bg":this.brand.getColorBySymbol(n.Symbol)},labels:[...this.labels],style:[{}],data:{labels:[...this.labels],datasets:[{...S,data:[n.PERatio,n.ReturnOnEquityTTM,n.ReturnOnAssetsTTM,n.PriceToSalesRatioTTM,n.PriceToBookRatio,n.EPS,n.DividendPerShare],...B}]}}))})}}return t.\u0275fac=function(o){return new(o||t)(a.Y36(p.E),a.Y36(v.g))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-watchlist"]],decls:4,vars:4,consts:[[4,"ngIf","ngIfElse"],["loading",""],[3,"brandData","labels","withCharts"]],template:function(o,r){if(1&o&&(a.YNc(0,C,2,3,"ng-container",0),a.ALo(1,"async"),a.YNc(2,W,1,0,"ng-template",null,1,a.W1O)),2&o){const n=a.MAs(3);a.Q6J("ngIf",r.isLoaded(a.lcZ(1,2,r.dataStore$)))("ngIfElse",n)}},dependencies:[c.O5,l.ORR,y.O,c.Ov]}),t})(),data:{title:$localize`Watchlist`}}];let M=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[d.Bz.forChild(T),d.Bz]}),t})(),O=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[M,c.ez,l.dTQ,l.dGk,g.QX,l.P4_,c.ez,l.zE6,l.qek,u.UX,l.hJ1,l.ejP,l.hJ1,l.ga2,m.N,l.FxY,l.Fme,l.U$I,f.H]}),t})()}}]);