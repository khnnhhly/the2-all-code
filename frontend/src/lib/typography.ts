/**
 * Typography helper utilities for The Two Planner
 * Maps Sanity sectionTypography configuration to inline styles and CSS properties.
 */

export interface TypographySettings {
  titleFontFamily?: string;
  titleFontSize?: string;
  titleCustomFontSize?: string;
  titleColor?: string;
  titleCustomColor?: string;
  scriptFontFamily?: string;
  scriptFontSize?: string;
  scriptCustomFontSize?: string;
  bodyFontFamily?: string;
  bodyFontSize?: string;
  bodyCustomFontSize?: string;
  bodyColor?: string;
  bodyCustomColor?: string;
  textAlign?: string;
}

export function getTitleStyle(typography?: TypographySettings | null, baseStyle: React.CSSProperties = {}): React.CSSProperties {
  if (!typography) return baseStyle;

  const style: React.CSSProperties = { ...baseStyle };

  if (typography.titleFontFamily && typography.titleFontFamily !== 'default') {
    style.fontFamily = typography.titleFontFamily;
  }

  if (typography.titleFontSize && typography.titleFontSize !== 'default') {
    style.fontSize = typography.titleFontSize === 'custom'
      ? typography.titleCustomFontSize || baseStyle.fontSize
      : typography.titleFontSize;
  }

  if (typography.titleColor && typography.titleColor !== 'default') {
    style.color = typography.titleColor === 'custom'
      ? typography.titleCustomColor || baseStyle.color
      : typography.titleColor;
  }

  if (typography.textAlign && typography.textAlign !== 'default') {
    style.textAlign = typography.textAlign as React.CSSProperties['textAlign'];
  }

  return style;
}

export function getScriptStyle(typography?: TypographySettings | null, baseStyle: React.CSSProperties = {}): React.CSSProperties {
  if (!typography) return baseStyle;

  const style: React.CSSProperties = { ...baseStyle };

  if (typography.scriptFontFamily && typography.scriptFontFamily !== 'default') {
    style.fontFamily = typography.scriptFontFamily;
  }

  if (typography.scriptFontSize && typography.scriptFontSize !== 'default') {
    style.fontSize = typography.scriptFontSize === 'custom'
      ? typography.scriptCustomFontSize || baseStyle.fontSize
      : typography.scriptFontSize;
  }

  if (typography.titleColor && typography.titleColor !== 'default') {
    style.color = typography.titleColor === 'custom'
      ? typography.titleCustomColor || baseStyle.color
      : typography.titleColor;
  }

  if (typography.textAlign && typography.textAlign !== 'default') {
    style.textAlign = typography.textAlign as React.CSSProperties['textAlign'];
  }

  return style;
}

export function getBodyStyle(typography?: TypographySettings | null, baseStyle: React.CSSProperties = {}): React.CSSProperties {
  if (!typography) return baseStyle;

  const style: React.CSSProperties = { ...baseStyle };

  if (typography.bodyFontFamily && typography.bodyFontFamily !== 'default') {
    style.fontFamily = typography.bodyFontFamily;
  }

  if (typography.bodyFontSize && typography.bodyFontSize !== 'default') {
    style.fontSize = typography.bodyFontSize === 'custom'
      ? typography.bodyCustomFontSize || baseStyle.fontSize
      : typography.bodyFontSize;
  }

  if (typography.bodyColor && typography.bodyColor !== 'default') {
    style.color = typography.bodyColor === 'custom'
      ? typography.bodyCustomColor || baseStyle.color
      : typography.bodyColor;
  }

  if (typography.textAlign && typography.textAlign !== 'default') {
    style.textAlign = typography.textAlign as React.CSSProperties['textAlign'];
  }

  return style;
}

export function getSectionStyle(typography?: TypographySettings | null, baseStyle: React.CSSProperties = {}): React.CSSProperties {
  if (!typography) return baseStyle;

  const style: React.CSSProperties = { ...baseStyle };

  if (typography.textAlign && typography.textAlign !== 'default') {
    style.textAlign = typography.textAlign as React.CSSProperties['textAlign'];
  }

  return style;
}
