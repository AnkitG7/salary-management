export function getCardStyle(token) {
  return {
    borderRadius: 28,

    background: token.colorBgContainer,

    border: `1px solid ${token.colorBorderSecondary}`,

    boxShadow: token.boxShadowSecondary,
  };
}
