import React from "react";
import "./story.scss";

import img2 from "../../assets/img2.jpg";

export default class Story extends React.Component {
  constructor() {
    super();

    this.state = {
      pageY: 1
    };

    this.handlePageScroll = this.handlePageScroll.bind(this);
  }

  componentDidMount() {
    //Scroll top after the router animation has finished
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);

    window.addEventListener("scroll", this.handlePageScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handlePageScroll);
  }

  handlePageScroll() {
    this.setState({
      pageY: 1 - window.pageYOffset / 500
    });
  }

  render() {
    return (
      <section className="story_read">
        <div className="image" style={{ opacity: this.state.pageY }}>
          <img src={img2}></img>
        </div>
        <header>
          <h1>The Whatever</h1>
          <span>Alexandre Mital</span>
        </header>
        <div className="proze">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean erat
            nulla, egestas nec varius non, euismod et risus. Etiam auctor vitae
            lorem vitae semper. Curabitur imperdiet malesuada tortor ac
            pellentesque. Aliquam et lorem nunc. Donec elementum at justo eu
            varius. Donec est eros, tempus quis lorem quis, tristique rhoncus
            augue. Phasellus sapien purus, placerat sit amet volutpat vitae,
            lacinia ut metus.
          </p>
          <p>
            Etiam a arcu feugiat, elementum lorem id, dapibus dolor. Phasellus
            dignissim porta nulla, nec ultricies augue bibendum ultrices. Ut
            metus orci, elementum quis nibh eu, tincidunt aliquet nulla. Donec
            fermentum accumsan nibh, ut condimentum lorem consequat quis. Morbi
            pellentesque fermentum nisl at vehicula. Integer egestas, urna in
            maximus imperdiet, quam libero consequat neque, accumsan posuere
            purus purus et odio. Curabitur consequat quam lacus, vitae semper
            nunc dapibus ac. Nunc quis augue ac dolor cursus tempus. In lacus
            sem, consectetur id dapibus non, ultrices sed ipsum. Vivamus
            imperdiet, sapien non ullamcorper semper, ex enim porta odio, a
            pharetra nisl ex id nisl.
          </p>
          <p>
            Proin risus nisi, ullamcorper quis cursus sit amet, imperdiet eu
            urna. Nullam finibus sed neque vel tempus. Cras mattis id eros at
            vehicula. Phasellus cursus malesuada nibh non rutrum. Donec ante
            orci, viverra a interdum ac, fermentum et velit. Proin egestas ex ac
            arcu vestibulum, eu venenatis nisi blandit. In mollis elit non
            tincidunt consequat. Duis eu risus nunc. Nullam id enim urna. Nulla
            tempus leo nisl, ullamcorper consectetur justo semper et. Vivamus
            laoreet ipsum nec ullamcorper fermentum. Duis at mauris sed eros
            fermentum tempor. Pellentesque vitae sollicitudin nisi. Donec
            iaculis lectus nibh, eget interdum nibh suscipit et.
          </p>
          <p>
            Integer feugiat mauris sed euismod tempor. Nulla nec nisl a ipsum
            dignissim facilisis. Nunc est eros, rutrum ac bibendum sed, luctus
            ut urna. Nunc elit metus, ornare vitae volutpat non, finibus vitae
            libero. Fusce pretium lorem id sodales vehicula. Donec cursus sem
            feugiat lectus pretium fringilla. Sed pulvinar efficitur luctus.
            Vestibulum non ligula ligula. Duis tincidunt turpis sed felis
            rutrum, sit amet vestibulum turpis auctor. Duis lobortis sapien in
            tempus fermentum. In tincidunt ac sem et mollis.
          </p>
          <p>
            Fusce eget augue suscipit, ultrices lacus ac, fringilla tortor.
            Nulla interdum orci nec risus dictum, in ullamcorper erat
            consectetur. Mauris tristique pellentesque suscipit. Maecenas quis
            suscipit orci. Mauris euismod, ipsum ut dapibus dapibus, elit dui
            efficitur ligula, at egestas lorem justo a quam. Praesent ut est ut
            purus ullamcorper semper. Donec fringilla tellus elit, eu facilisis
            est convallis viverra. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Nam posuere
            blandit ipsum, at maximus felis malesuada quis. Sed a lacus id lacus
            finibus iaculis. Donec vel libero vitae urna facilisis ultricies
            quis in velit. Vestibulum faucibus lacus ut mauris tincidunt auctor.
          </p>
        </div>
      </section>
    );
  }
}
