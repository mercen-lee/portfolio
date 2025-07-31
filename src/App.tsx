import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f2f5;
    font-family: 'Arial', sans-serif;
    margin: 0;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  gap: 20px;
`;

const ViewerContainer = styled.div`
  background-color: #e9e9e9;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

const PageWrapper = styled.div`
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .react-pdf__Page__canvas {
    width: 100% !important;
    height: auto !important;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  max-width: 900px;
  margin-bottom: -10px;
`;

const DownloadButton = styled.a`
  background-color: #222222;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: background-color 0.2s, transform 0.2s;
  
  &:hover {
    background-color: #777777;
    transform: scale(1.05);
  }
`;

const StatusMessage = styled.p`
  font-size: 18px;
  color: #555;
  padding: 40px;
  text-align: center;
`;

const App: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [documentLoaded, setDocumentLoaded] = useState<boolean>(false);

  const pdfFile = "/assets/이석호_portfolio.pdf";

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setDocumentLoaded(true);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error(`PDF 문서를 불러오는 데 실패했습니다: ${error.message}`);
  };

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        {documentLoaded && (
          <TopBar>
            <DownloadButton href={pdfFile} download>
              포트폴리오 다운로드
            </DownloadButton>
          </TopBar>
        )}
        <ViewerContainer>
          <Document
            file={pdfFile}
            scale={3}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<StatusMessage>포트폴리오를 불러오는 중입니다...</StatusMessage>}
            error={<StatusMessage style={{color: '#d93025'}}>PDF를 불러오지 못했습니다. 파일 경로를 확인해주세요.</StatusMessage>}
          >
            {numPages && Array.from(new Array(numPages), (el, index) => (
              <PageWrapper key={`page_${index + 1}`}>
                <Page
                  pageNumber={index + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </PageWrapper>
            ))}
          </Document>
        </ViewerContainer>
      </AppWrapper>
    </>
  );
};

export default App;