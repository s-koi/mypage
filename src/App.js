import React, {useEffect, useState} from "react"
import {fetchImages} from "./api";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom"

function Header() {
    return (
        <header className="hero is-primary is-medium">
            <div className="hero-body">
                <div className="container">
                    <p className="title">
                        いつでもガチャ
                    </p>
                </div>
            </div>
        </header>
    )
}


function Gacha() {
    const item = document.querySelector(".gachaResult");
    
    const [probSSR, setProbSSR] = React.useState('');
    const [probSR, setProbSR] = useState('');

    const handleChange1 = (e) => {
        setProbSSR(e.target.value);
    }

    const handleChange2 = (e) => {
        setProbSR(e.target.value);
    }

    function handleSubmit(e){ // 「ガチャる」ボタンを押したときのメソッド
        e.preventDefault();
        const results = Result(probSSR, probSR);
        item.textContent = results;
    }

    function Result(ssr, sr){
        
        const max = 10; // 10回分のガチャを回す
        let probability = Math.random(); // 確率の判定を行うための変数
        let rCount = 0;

        // 結果を表示する際に使用する排出されたレア度
        const ssRare = "SSR ";
        const sRare = "SR ";
        const rare = "R ";
        const resultArray=[];

        // 確率判定を正しくできるように100で割る
        ssr /= 100.0;
        sr /= 100.0;

        if((ssr > 0 && ssr <= 1) && (sr > 0 && sr <= 1) && (ssr + sr <= 1)){
            for(let count=0; count<max; count++){
                if(rCount < 9){
                    if(probability<=ssr){ // ランダム変数の値がssr以下の場合SSRを排出
                        resultArray.push(ssRare);
                    }else if(probability<=ssr+sr){ // ランダム変数の値がssr以上sr以下の場合SRを排出
                     resultArray.push(sRare);
                    }else { // ランダム変数の値がssr、sr以上の場合はRを排出
                        resultArray.push(rare);
                        rCount++;
                    }
                }else { // ９回Rが排出された場合、SR以上が確定
                    if(probability<=ssr){
                        resultArray.push(ssRare);
                    }else {
                        resultArray.push(sRare);
                    }
                }
                probability = Math.random(); // ランダム変数をリセット
            }
        }else { // ssrとsrの確立が0~100に入っていない場合
            resultArray.push("正しい確率を入れてください！")
        }

        return resultArray;
    }

    return (
        <main>
            <div className="section">
                <div className="content">                
                    <p className="title">
                        排出率設定
                    </p>
                    <p>SSR排出確率とSR排出確率の設定を行いましょう！</p>
                    <p>※10連ガチャです。SRは１枚以上確定で排出されます。</p>
                </div>
                <div className="field">
                    <form onSubmit={handleSubmit}>
                        <label className="label">SSR確率</label>
                        <div className="control">
                            <input id="SSR" value={probSSR} onChange={handleChange1} 
                            className="input is-small" type="text" placeholder="0~100" />
                            <p>%</p>
                        </div>
                    
                        <label className="label">SR確率</label>
                        <div className="control">
                            <input id="SR" value={probSR} onChange={handleChange2}
                            className="input is-small" type="text" placeholder="0~100" />
                            <p>%</p>
                        </div>

                        <button onClick={item} className="button is-primry">ガチャる！</button>

                        <p className="gachaResult"></p>
                                                
                    </form>
                </div>
            </div>
        </main>
    )
}

function Start(){
    return (
        <main>
            <section className="section">
                <div className="content">
                    <h1 className="title is-2">いつでもガチャへようこそ！</h1>
                    <p>
                        このサイトでは、ガチャ欲を抑えきれなくなってしまった人のために作られた<strong>至高の</strong>サイトです。
                    </p>
                    <h2 className="title is-3">使い方</h2>
                    <p>
                        上のバーにある「ガチャる」からガチャ画面に進むことが出来ます。
                    </p>
                    <p>
                        SSR、SRの排出率の設定を行うことで、好みのゲームに合わせた排出率にすることが出来ます。
                    </p>
                    <p>
                        「ガチャる！」というボタンをクリックすることで、１０連ガチャを回すことが出来ます。
                    </p>
                    <h3 className="title is-3">※注意点</h3>
                    <p>
                        天井機能はございません。綺麗な青天井ですね。
                    </p>
                    <p>
                        SSRはピックアップ機能がございません。すり抜けてないことを祈りましょう。
                    </p>
                    <p>
                        あくまでガチャを引くため<strong>だけ</strong>のサイトです。あまり一喜一憂しないほうが身のためでしょう。
                    </p>
                </div>
            </section>
        </main>
    )
}

function Image(prop){
    return (
        <figure className="image">
            <img src={prop.src} alt="dog"/>
        </figure>
    )
}

function Load(){
    return <p>犬を探し中だワン！</p>;
}

function Dog(prop){
    const {url}=prop;
    if(url === null){
        return <Load />;
    }
    return (
        <div className="columns is-vcenterd">
            <div key={url} className="column is-3">
                <Image src={url}/>
            </div>
        </div>
    )
}

function Healing(){
    const [url, setUrl]=useState(null);
    useEffect(() => {
        fetchImages().then((url) => {
            setUrl(url);
        });
    }, []);
    return (
        <main>
            <div className="container is-light">
                <p>ガチャのし過ぎで<strong>癒し</strong>を求めたくなったあなた。ガチャから何も当てられなくなってしまって<strong>虚空</strong>のあなた。</p>
                <p>犬の画像を見て癒されませんか？</p>
            </div>
            <div className="container is light">
                拾っている画像元→<a href="https://dog.ceo/dog-api/">Dog API</a>
            </div>
            <section className="section">
                <div className="container">
                    <Dog url={url} />
                </div>
            </section>
        </main>
    )
}

function Label() {
    return (

        <BrowserRouter>
            <div className="breadcrumb is-centered is-medium" aria-label="breadcrumbs">
                <ul>
                    <li><Link to="/">はじめに</Link></li>
                    <li><Link to="/gacha">ガチャる</Link></li>
                    <li><Link to="/healing">癒しを求めたくなったら...</Link></li>
                </ul>
            </div>
            
            <Switch>
                <Route exact path="/">
                    <Start />
                </Route>
                <Route path="/gacha">
                    <Gacha />
                </Route>
                <Route path="/healing">
                    <Healing />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

function Footer() {
    return (
        <footer class="footer">
            <div class="content has-text-centered">
                <p className="copyright">&copy; Shuhei Koizumi</p>
            </div>
        </footer>
    )
}

function App() {
    return (
        <div>
            <Header />
            <Label />
            <Footer />
        </div>
    )
}

export default App;