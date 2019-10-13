import classnames from 'classnames';
import React from 'react';

import Button from 'components/Button';

import styles from './modal.module.scss';

interface ButtonProp {
  className: string;
  onClick: () => void;
  text: string;
}

interface ModalProps {
  title: string;
  buttonProps?: ButtonProp[];
  className?: string;
  description?: string;
  visible: boolean;
  style?: React.CSSProperties;
}

const renderButtons = (buttonProps: ButtonProp[]) =>
  buttonProps.slice(0, 2).map(({ className = '', ...rest }) => (
    <Button
      className={classnames(styles.modalButton, {
        [className]: !!className
      })}
      {...rest}
    />
  ));

const Modal: React.FC<ModalProps> = ({
  title,
  buttonProps = [],
  className = '',
  description,
  visible,
  style
}) => {
  return visible ? (
    <div
      style={style}
      className={classnames(styles.mainContainer, {
        [className]: Boolean(className)
      })}
    >
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonContainer}>
          {renderButtons(buttonProps)}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
