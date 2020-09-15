import React from 'react';
import parser from 'html-react-parser';

const ReadOnly = ({ data }) => {

  const sanatize = (word) => {
    return word.replace("<br>", "");
  }

  const renderBlock = ({ type, data }) => {
    let content = '';
    switch (type) {
      case 'header':
        const element = React.createElement(
          `h${data.level}`,
          {
            className: 'ce-header',
          },
          sanatize(data.text),
        );
        content = <div style={{ height: 'fit-content' }}>{element}</div>;
        break;
      case 'list':
        content = (
          <ul className={`"cdx-block" "cdx-list" "cdx-list--${data.style}"`}>
            {data.items.map((item) => (
              <li key={Math.random()} className="cdx-list__item">
                {sanatize(item)}
              </li>
            ))}
          </ul>
        );
        break;
      case 'embed':
        content = (
          <div className="cdx-block embed-tool" style={{ textAlign: 'center', marginTop: '5px' }}>
            <iframe
              className="embed-tool__content"
              id="NotSoGoodWithCSS"
              src={data.embed} 
              title={Math.random()}
              width={data.width}
              height={data.height}
              allowFullScreen
            ></iframe>
            <div className="embed-tool__caption" style={{ opacity: 0.55 }}>{sanatize(data.caption)}</div>
          </div>
        );
        break;
      case 'code':
        content = (
          <div className="cdx-block ce-code">
            <span style={{ textAlign: 'right', marginBottom: '5px' }}>{data.language}</span>
            <pre className="ce-code__textarea cdx-input prettyprint" style={{ minHeight: "50px" }}>
              <code className="lang-js">{data.code + ''}</code>
            </pre>
          </div>
        );
        break;
      case 'image':
        content = (
          <div className="cdx-block image-tool image-tool--filled">
            <div className="image-tool__image">
              <img className="image-tool__image-picture" src={data.file.url} alt="Cool pix"></img>
              <span className="embed-tool__caption" style={{ textAlign: 'right', marginBottom: '5px' }}>{sanatize(data.caption)}</span>
            </div>
          </div>
        );
        break;
      case 'gist':
        const src = `<script src=${data.url}></script>`;
        content = (
          <div className="cdx-block embed-tool" style={{ textAlign: 'center', marginTop: '5px' }}>
            <iframe
              className="embed-tool__content"
              title={"Gist Embed"}
              srcDoc={src}
              frameBorder="0"
              style={{ width: "100%", height: data.height }}
            >
            </iframe>
            <div className="embed-tool__caption" style={{ textAlign: 'center', opacity: 0.55 }}>{sanatize(data.caption)}</div>
          </div>
        );
        break;
      case 'delimiter':
        content = (
          <div className="ce-delimiter cdx-block"></div>
        )
        break;
      case 'table':
        content = (
          <div className="tc-editor cdx-block" key={Math.random()}>
            <div className="tc-table__wrap" key={Math.random()}>
              <table className="tc-table" key={Math.random()}>
                <tbody key={Math.random()}>
                  {data.content.map(row => (
                    <tr key={Math.random()}>
                      {
                        row.map(col => (
                          <td className="tc-table__cell" key={Math.random()}>
                            <div className="tc-table__area" key={Math.random()}>
                              <div className="tc-table__inp" key={Math.random()}>
                                {sanatize(col)}
                              </div>
                            </div>
                          </td>
                        ))
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
        break;
      default:
        content = <div className="ce-paragraph cdx-block"> {parser(`${data.text}`)} </div>;
        break;
    }
    return (
      <div className="ce-block" key={Math.random()}>
        <div className="ce-block__content">{content}</div>
      </div>
    );
  };

  return data.blocks.map((block) => renderBlock(block));
};

export default ReadOnly;