import styled from "styled-components";

const VolumeSlider = ({ volume, handleVolumeChange }) => {

  return (
    <StyledWrapper>
      <label className="slider">
        <input
          type="range"
          className="level"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .slider {
    /* slider */
    --slider-width: 192px;
    --slider-height: 15px;
    --slider-bg: #F5EDF0;
    --slider-border-radius: 5px;
    /* level */
    --level-color: #D7521D;
    --level-transition-duration: 5s;
  }

  .slider {
    position: relative;
    cursor: pointer;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-orient: horizontal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .slider .volume {
    display: inline-block;
    vertical-align: top;
    margin-right: var(--icon-margin);
    color: var(--icon-color);
    width: var(--icon-size);
    height: auto;
    position: absolute;
    left: 18px;
    pointer-events: none;
    transition-duration: 0.5s;
  }

  .slider .level {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: var(--slider-width);
    height: var(--slider-height);
    background: var(--slider-bg);
    overflow: hidden;
    border-radius: var(--slider-border-radius);
    -webkit-transition: height var(--level-transition-duration);
    -o-transition: height var(--level-transition-duration);
    transition: height var(--level-transition-duration);
    cursor: inherit;
  }

  .slider .level::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0px;
    height: 0px;
    -webkit-box-shadow: -200px 0 0 200px var(--level-color);
    box-shadow: -100px 0 5px 100px var(--level-color),
      -100px 0px 20px 100px var(--level-color);
  }
  .slider .level:hover ~ .volume {
    color: var(--level-color);
    opacity: 0.6;
  }

  .slider .level::-moz-range-thumb {
    width: 0;
    height: 0;
    border-radius: 0;
    border: none;
    box-shadow: -100px 0 5px 100px var(--level-color),
      -100px 0px 20px 100px var(--level-color);
  }
`;

export default VolumeSlider;
