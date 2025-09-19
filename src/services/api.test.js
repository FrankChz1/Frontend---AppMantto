import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('axios', () => {
  const axiosInstance = {
    get: vi.fn(),
  };

  return {
    default: {
      create: vi.fn(() => axiosInstance),
      __instance: axiosInstance,
    },
    __esModule: true,
  };
});

import axios from 'axios';
import { downloadReportExcel } from './api';

describe('downloadReportExcel', () => {
  const originalCreateElement = document.createElement;
  const originalCreateObjectURL = window.URL.createObjectURL;
  const originalRevokeObjectURL = window.URL.revokeObjectURL;
  let appendSpy;
  let createdLink;

  const axiosInstance = axios.__instance;

  beforeEach(() => {
    axiosInstance.get.mockResolvedValue({ data: new Blob(['excel']) });

    appendSpy = vi.spyOn(document.body, 'appendChild');
    vi.spyOn(document.body, 'removeChild');

    window.URL.createObjectURL = vi.fn(() => 'blob:url');
    window.URL.revokeObjectURL = vi.fn();

    document.createElement = vi.fn((tagName) => {
      const element = originalCreateElement.call(document, tagName);
      if (tagName === 'a') {
        element.click = vi.fn();
        createdLink = element;
      }
      return element;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.createElement = originalCreateElement;
    window.URL.createObjectURL = originalCreateObjectURL;
    window.URL.revokeObjectURL = originalRevokeObjectURL;
    axiosInstance.get.mockReset();
    createdLink = undefined;
  });

  it('solicita el endpoint correcto y dispara la descarga', async () => {
    await downloadReportExcel();

    expect(axiosInstance.get).toHaveBeenCalledWith('api/reports/excel', {
      responseType: 'blob',
    });
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(appendSpy).toHaveBeenCalledWith(createdLink);
    expect(createdLink?.click).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:url');
  });
});
