//축제 상세 페이지
/* 상세 페이지 작은 화면에 들어갈 내용
    1. 축제 제목
    2. 축제 기한
    3. 축제 위치
*/ 
/* 상세 페이지 큰 화면에 들어갈 내용
    1. 축제 제목
    2. 축제 기한
    3. 축제 위치
    4. 축제 개요? 이건 이야기 해보자
    5. 행사 소개
    6. 축제 행사 내용
 */  
import React from "react";
import Card from 'react-bootstrap/Card';
import "./FestivalDetailPage.css";


//축제 제목
const FestiTitle = function() {
    console.log("제목")
 return <h1>축제 제목</h1>
 }
 
 //축제 날짜
 const FestiDates = function() {
     return <span>20xx.xx.xx ~ 20xx.xx.xx</span>
 }
 
 //축제 위치
 const FestiLocstion = function(){
    return<span>oo시oo구</span>
 }

export default function FestivalDetailPage(){
    return(
        <div className = "card-container">
            <Card className="custim-card" style={{width: '400px'}}>
                <Card.Img
                    variant="top"
                    src="..."
                    alt="축제 이미지"
                    className="card-image"
                />
                <Card.Body>
                    
                    <Card.Title className="card-title"><FestiTitle/></Card.Title>  
                    <Card.Text className="card-dates"><FestiDates/></Card.Text>
                    <Card.Text className="card-location"><FestiLocstion/></Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}